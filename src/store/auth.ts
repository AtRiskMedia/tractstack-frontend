import { persistentMap } from "@nanostores/persistent";

export type AuthSettings = {
  key: string | undefined;
  beliefs: string | undefined;
  encryptedEmail: string | undefined;
  encryptedCode: string | undefined;
  consent: string | undefined;
  lastRun: string | undefined;
};

export const auth = persistentMap<AuthSettings>("auth:", {
  key: undefined,
  beliefs: undefined,
  encryptedEmail: undefined,
  encryptedCode: undefined,
  consent: undefined,
  lastRun: undefined,
});
