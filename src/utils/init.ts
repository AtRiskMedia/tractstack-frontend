import { getTokens } from "../api/axiosClient";
import { events, current } from "../store/events";
import {
  auth,
  sync,
  locked,
  entered,
  error,
  success,
  loading,
} from "../store/auth";
import { JWT_LIFETIME } from "../constants";

export async function init() {
  if (!import.meta.env.PROD || locked.get()) {
    return null;
  }

  const authPayload = auth.get();
  const lastActive = authPayload?.active ? parseInt(authPayload.active) : 0;

  // only sync once; reset if soon inactive
  if (lastActive > Date.now() - JWT_LIFETIME && sync.get()) {
    return null;
  }

  locked.set(true);

  // if no token, inactive, or soon inactive, get one
  if (!authPayload?.token || !(lastActive > Date.now() - JWT_LIFETIME)) {
    // check for utmParams
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const httpReferrer = document.referrer;
    const utmSource = params[`utm_source`] || undefined;
    const utmMedium = params[`utm_medium`] || undefined;
    const utmCampaign = params[`utm_campaign`] || undefined;
    const utmTerm = params[`utm_term`] || undefined;
    const utmContent = params[`utm_content`] || undefined;
    const referrer = {
      httpReferrer,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
    };

    // remembers session for 75 minutes across tabs;
    // or when consent has been given
    // must pass utmSource and fingerprint if avail with consent
    const settings =
      (lastActive > Date.now() - JWT_LIFETIME * 5 ||
        authPayload?.consent === "1") &&
      authPayload?.key
        ? {
            fingerprint: authPayload.key,
            encryptedCode: authPayload?.encryptedCode,
            encryptedEmail: authPayload?.encryptedEmail,
            referrer,
          }
        : { referrer };
    const conciergeSync = await getTokens(settings);
    if (conciergeSync?.tokens) {
      auth.setKey(`token`, conciergeSync.tokens);
    }
    if (conciergeSync?.fingerprint) {
      auth.setKey(`key`, conciergeSync.fingerprint);
    }
    if (conciergeSync?.firstname) {
      auth.setKey(`firstname`, conciergeSync.firstname);
    }
    if (conciergeSync?.consent === "1") {
      auth.setKey(`consent`, `1`);
    }
    auth.setKey(`active`, Date.now().toString());
  }

  // unlock; set sync
  sync.set(true);
  locked.set(false);
  error.set(undefined);
  success.set(undefined);
  loading.set(undefined);

  // flag on first visit from external
  if (!entered.get()) {
    entered.set(true);
    const referrer = document.referrer;
    const internal =
      referrer !== `` &&
      referrer.indexOf(location.protocol + "//" + location.host) === 0;
    if (!internal && referrer) {
      const event = {
        id: current.get().id,
        parentId: current.get().parentId,
        type: `StoryFragment`,
        verb: `ENTERED`,
      };
      events.set([...events.get(), event]);
    }
  }
}
