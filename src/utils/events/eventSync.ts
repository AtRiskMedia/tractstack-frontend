import type { Event } from "../../types";
import { auth } from "../../store/auth";

export async function eventSync(payload: Event[]) {
  console.log(`events`,payload);
  auth.setKey("lastRun", Date.now().toString());
  return true;
}
