import { createAxiosClient } from "./createAxiosClient";
import { conciergeSync } from "../api/services";
import { auth, profile, sync, locked } from "../store/auth";
import type { Referrer, IAuthStoreLoginResponse } from "../types";

function getCurrentAccessToken() {
  const authPayload = auth.get();
  return authPayload?.token;
}

function setRefreshedTokens(response: IAuthStoreLoginResponse) {
  if (response?.tokens) {
    auth.setKey(`token`, response.tokens);
  }
  if (response?.fingerprint) {
    auth.setKey(`key`, response.fingerprint);
  }
  if (response?.firstname) {
    profile.set({
      ...profile.get(),
      firstname: response.firstname,
    });
  }
  if (response?.knownLead) {
    auth.setKey(`consent`, `1`);
    auth.setKey(`hasProfile`, `1`);
  } else auth.setKey(`hasProfile`, undefined);
  if (response?.auth) {
    auth.setKey(`unlockedProfile`, `1`);
  } else auth.setKey(`unlockedProfile`, undefined);
  auth.setKey(`active`, Date.now().toString());
}

function logout(full: boolean = false) {
  sync.set(false);
  locked.set(false);
  if (full) {
    auth.setKey(`token`, undefined);
  }
}

function getAuthData() {
  const authData = {
    encryptedCode: ``,
    encryptedEmail: ``,
  };
  return {
    encryptedCode: authData.encryptedCode,
    encryptedEmail: authData.encryptedEmail,
  };
}

export const client = createAxiosClient({
  options: {
    baseURL: import.meta.env.PUBLIC_CONCIERGE_BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": `application/json`,
    },
  },
  getCurrentAccessToken,
  refreshTokenUrl: `${import.meta.env.PUBLIC_CONCIERGE_BASE_URL}/auth/refreshToken`,
  setRefreshedTokens,
  getAuthData,
  logout,
});

export const getTokens = async ({
  fingerprint,
  codeword,
  email,
  encryptedCode,
  encryptedEmail,
  referrer,
}: {
  fingerprint?: string | undefined;
  codeword?: string | undefined;
  email?: string | undefined;
  encryptedCode?: string | undefined;
  encryptedEmail?: string | undefined;
  referrer: Referrer;
}) => {
  const params =
    codeword && email
      ? { codeword, email }
      : encryptedCode && encryptedEmail
        ? { encryptedCode, encryptedEmail }
        : {};
  try {
    const ref = { ...referrer };
    if (!ref?.utmCampaign) delete ref.utmCampaign;
    if (!ref?.utmContent) delete ref.utmContent;
    if (!ref?.utmMedium) delete ref.utmMedium;
    if (!ref?.utmSource) delete ref.utmSource;
    if (!ref?.utmTerm) delete ref.utmTerm;
    const options = { referrer: ref, ...params, fingerprint };
    const response = await conciergeSync(options);
    const accessToken = response.data.jwt;
    const auth = response.data.auth;
    const knownLead = response.data.known_lead;
    const firstname = response.data.first_name;
    const consent = response.data.consent;
    const newFingerprint = response.data.fingerprint;
    const encryptedEmail = response.data.encryptedEmail;
    const encryptedCode = response.data.encryptedCode;
    const mode = response.data.mode;
    const beliefs =
      typeof response.data.beliefs === `string`
        ? JSON.parse(response?.data?.beliefs)
        : null;
    return {
      tokens: accessToken,
      auth,
      firstname,
      knownLead,
      mode,
      fingerprint: newFingerprint,
      encryptedEmail,
      encryptedCode,
      beliefs,
      consent,
      error: null,
    };
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.log(`error`, error);
    return {
      error: error?.response?.data?.message || error?.message || error,
      tokens: null,
    };
  }
};
