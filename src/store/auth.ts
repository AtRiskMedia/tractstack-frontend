import { persistentMap } from "@nanostores/persistent";

export type AuthSettings = {
  key: string | undefined;
  token: string | undefined;
  beliefs: string | undefined;
  encryptedEmail: string | undefined;
  encryptedCode: string | undefined;
  consent: string | undefined;
  firstname: string | undefined;
};

export const auth = persistentMap<AuthSettings>("auth:", {
  key: undefined,
  token: undefined,
  beliefs: undefined,
  encryptedEmail: undefined,
  encryptedCode: undefined,
  consent: undefined,
  firstname: undefined,
});
