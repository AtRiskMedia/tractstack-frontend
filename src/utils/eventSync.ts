import type { Event } from "../types";

export async function eventSync(payload: Event[]) {
  console.log(`didn't actually send yet`, payload);
  return true;
}
