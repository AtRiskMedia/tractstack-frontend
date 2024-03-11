import type { Event } from "../types";
import { auth } from "../store/auth";

export async function eventSync(payload: Event[]) {
  console.log(`didn't actually send yet`);
  console.log(payload);
  auth.setKey("lastRun", Date.now().toString());
  return true;
}
