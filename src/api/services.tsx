import { client } from "./axiosClient";
import type {
  IAxiosProfileProps,
  IAxiosRegisterProps,
  Events,
  EventNodes,
  Referrer,
} from "../types";

export async function conciergeSync({
  codeword,
  email,
  encryptedEmail,
  encryptedCode,
  referrer,
  fingerprint,
}: IAxiosRegisterProps) {
  const payload =
    referrer.httpReferrer === ``
      ? {
          codeword,
          email,
          encryptedEmail,
          encryptedCode,
          fingerprint,
        }
      : {
          codeword,
          email,
          encryptedEmail,
          encryptedCode,
          referrer,
          fingerprint,
        };
  console.log(`conciergeSync`, payload);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const options: any = { authorization: false };
  return client.post(`/auth/sync`, payload, options);
}

export async function pushPayload({
  events,
  nodes,
  referrer,
}: {
  events: Events;
  nodes: EventNodes;
  referrer: Referrer;
}) {
  console.log(`pushPayload`, events, nodes, referrer);
  return client.post(`/users/eventStream`, {
    nodes,
    events,
    referrer,
  });
}

export async function getGraph() {
  console.log(`getGraph`);
  return client.get(`/users/graph`);
}

export async function loadProfile() {
  console.log(`loadProfile`);
  return client.get(`/users/profile`);
}

export async function saveProfile({ profile }: IAxiosProfileProps) {
  console.log(`saveProfile`, profile);
  console.log(`post to axios`, profile);
  return client.post(`/users/profile`, profile);
}
