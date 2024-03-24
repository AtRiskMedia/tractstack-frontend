import { createAxiosClient } from "./createAxiosClient";
import { conciergeSync } from "../api/services";
import { auth, profile, sync, locked } from "../store/auth";
import type { Referrer, IAuthStoreLoginResponse } from "../types";

function getCurrentAccessToken() {
  const authPayload = auth.get();
  return authPayload?.token;
}

function setRefreshedTokens(response: IAuthStoreLoginResponse) {
  console.log(`login`, response);
  const authPayload = auth.get();
  const authProfile = profile.get();
  console.log(`update`, authPayload, authProfile);
}

function logout(full: boolean = false) {
  console.log(`logout`, full);
  sync.set(false);
  locked.set(false);
  if (full) {
    auth.setKey(`token`, undefined);
    console.log(`wiped token`);
    //auth.setKey(`active`, "0");
  }
}

function getAuthData() {
  const authData = {
    encryptedCode: ``,
    encryptedEmail: ``,
  };
  console.log(`must get auth data`);
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
  refreshTokenUrl: import.meta.env.PUBLIC_CONCIERGE_REFRESH_TOKEN_URL,
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
    const response = await conciergeSync({ referrer, ...params, fingerprint });
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
