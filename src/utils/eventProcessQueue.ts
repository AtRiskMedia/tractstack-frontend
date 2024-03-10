import { locked, events, panesVisible } from "../store/events";
import { auth } from "../store/auth";

export async function eventProcessQueue() {
  console.log(`INTERCEPT::send to concierge`, events.get());
  console.log(`CHECK::panesVisible queue`, panesVisible.get());
  const panes = panesVisible.get();
  Object.keys(panes).map((p: string) => {
    console.log(p, typeof panes[p]);
  });
  events.set([]);
  locked.set(false);
  auth.setKey("lastRun", Date.now().toString());
  return true;
}
