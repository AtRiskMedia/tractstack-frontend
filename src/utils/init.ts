import { getTokens } from "../api/axiosClient";
import { events, current } from "../store/events";
import { auth } from "../store/auth";

export async function init() {
  if (!import.meta.env.PROD) return null;

  // check for utmParams
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const httpReferrer = document.referrer;
  const utmSource = params[`utm_source`] || undefined;
  const utmMedium = params[`utm_medium`] || undefined;
  const utmCampaign = params[`utm_campaign`] || undefined;
  const utmTerm = params[`utm_term`] || undefined;
  const utmContent = params[`utm_content`] || undefined;
  if (utmSource)
    console.log(
      `params: source=${utmSource} medium=${utmMedium} campaign=${utmCampaign} term=${utmTerm} content=${utmContent} referrer=${httpReferrer}`
    );

  // must pass utmSource and fingerprint if avail with consent
  const authPayload = auth.get();
  const referrer = {
    httpReferrer,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
  };
  const settings =
    authPayload?.consent === "1" && authPayload?.key
      ? {
          fingerprint: authPayload.key,
          codeword: authPayload?.encryptedCode,
          email: authPayload?.encryptedEmail,
          referrer,
        }
      : { referrer };
  const conciergeSync = await getTokens(settings);
  if (conciergeSync?.tokens) auth.setKey(`token`, conciergeSync.tokens);
  if (conciergeSync?.fingerprint) auth.setKey(`key`, conciergeSync.fingerprint);
  if (conciergeSync?.firstname)
    auth.setKey(`firstname`, conciergeSync.firstname);
  if (conciergeSync?.consent === "1") auth.setKey(`consent`, `1`);
  else {
    auth.setKey(`consent`, undefined);
    auth.setKey(`firstname`, undefined);
  }

  const internal =
    document.referrer &&
    document.referrer.indexOf(location.protocol + "//" + location.host) === 0;
  if (!internal) {
    console.log(`entered from external link`, document.referrer);
    const event = {
      id: current.get().id,
      parentId: current.get().parentId,
      type: `StoryFragment`,
      verb: `ENTERED`,
    };
    events.set([...events.get(), event]);
  }
}
