import { createAxiosClient } from "./createAxiosClient";
import { conciergeSync } from "../api/services";
import type { IAuthStoreLoginResponse } from "../types";

function getCurrentAccessToken() {
  console.log(`needs token from nanostore`);
  return null;
}

function setRefreshedTokens(response: IAuthStoreLoginResponse) {
  console.log(`login`, response);
}

function logout(full: boolean = false) {
  console.log(`logout`, full);
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

export const getTokens = async (
  codeword?: string | null,
  email?: string | null
) => {
  console.log(`get Tokens`);
  const encryptedEmail = undefined;
  const encryptedCode = undefined;
  const referrer = {};
  const fingerprint = undefined;
  const params =
    codeword && email
      ? { codeword, email }
      : encryptedCode && encryptedEmail
        ? { encryptedCode, encryptedEmail }
        : {};
  try {
    console.log(`try`);
    const response = await conciergeSync({ referrer, ...params, fingerprint });
    const accessToken = response.data.jwt;
    const auth = response.data.auth;
    const knownLead = response.data.known_lead;
    const firstname = response.data.first_name;
    const newFingerprint = response.data.fingerprint;
    const encryptedEmail = response.data.encryptedEmail;
    const encryptedCode = response.data.encryptedCode;
    const beliefs =
      typeof response.data.beliefs === `string`
        ? JSON.parse(response?.data?.beliefs)
        : null;
    console.log(`got`, {
      tokens: accessToken,
      auth,
      firstname,
      knownLead,
      fingerprint: newFingerprint,
      encryptedEmail,
      encryptedCode,
      beliefs,
      error: null,
    });
    return {
      tokens: accessToken,
      auth,
      firstname,
      knownLead,
      fingerprint: newFingerprint,
      encryptedEmail,
      encryptedCode,
      beliefs,
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
