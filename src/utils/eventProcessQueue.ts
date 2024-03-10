import { locked, events, panesVisible } from "../store/events";
import { auth } from "../store/auth";
import { current } from "../store/events";
import { THRESHOLD_READ, THRESHOLD_GLOSSED } from "../constants";

export async function eventProcessQueue() {
  if (events.get().length)
    console.log(`INTERCEPT::must send to concierge`, events.get());
  const panes = panesVisible.get();
  Object.keys(panes).map((id: string) => {
    const value = panes[id];
    if (value) {
      console.log(`CHECK::panesVisible queue`, value);
      const diff = Date.now() - value;
      panesVisible.setKey(id, null);
      const verb =
        diff > THRESHOLD_READ
          ? `READ`
          : diff > THRESHOLD_GLOSSED
            ? `GLOSSED`
            : null;
      if (verb) {
        const event = {
          id: id,
          parentId: current.get().id,
          type: `Pane`,
          verb: verb,
        };
        console.log(`=event`, event);
        events.set([...events.get(), event]);
      }
    }
  });
  console.log(`didn't actually send events`);
  events.set([]);
  locked.set(false);
  auth.setKey("lastRun", Date.now().toString());
  return true;
}
