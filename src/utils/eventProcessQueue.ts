import { locked, events, panesVisible } from "../store/events";
import { auth } from "../store/auth";

export async function eventProcessQueue() {
  console.log(`INTERCEPT::send to concierge`, events.get());
  console.log(`CHECK::panesVisible queue`, panesVisible.get());
  events.set([]);
  locked.set(false);
  auth.setKey("lastRun", Date.now().toString());
  return true;
}
