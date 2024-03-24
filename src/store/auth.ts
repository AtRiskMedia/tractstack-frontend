import { persistentMap } from "@nanostores/persistent";
import { atom } from "nanostores";

export type AuthSettings = {
  key: string | undefined;
  token: string | undefined;
  beliefs: string | undefined;
  encryptedEmail: string | undefined;
  encryptedCode: string | undefined;
  consent: string | undefined;
  firstname: string | undefined;
  active: string | undefined;
};

export type AuthProfile = {
  firstname: string | undefined;
  contactPersona: string | undefined;
  email: string | undefined;
  shortBio: string | undefined;
  hasProfile: boolean | undefined;
  unlockedProfile: boolean | undefined;
};

export const auth = persistentMap<AuthSettings>("auth:", {
  key: undefined,
  token: undefined,
  beliefs: undefined,
  encryptedEmail: undefined,
  encryptedCode: undefined,
  consent: undefined,
  firstname: undefined,
  active: undefined,
});

export const entered = atom<boolean>(false);
export const sync = atom<boolean>(false);
export const locked = atom<boolean>(false);
export const error = atom<boolean | undefined>(undefined);
export const success = atom<boolean | undefined>(undefined);
export const loading = atom<boolean | undefined>(undefined);
export const profile = atom<AuthProfile>({
  firstname: undefined,
  contactPersona: undefined,
  email: undefined,
  shortBio: undefined,
  hasProfile: undefined,
  unlockedProfile: undefined,
});
