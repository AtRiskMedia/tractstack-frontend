import { events, panesVisible } from "../store/events";
import { current } from "../store/events";
import { eventSync } from "./eventSync";
import { THRESHOLD_READ, THRESHOLD_GLOSSED } from "../constants";

export async function eventProcessQueue() {
  const panes = panesVisible.get();
  Object.keys(panes).forEach((id: string) => {
    const value = panes[id];
    if (value) {
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
          duration: diff,
        };
        console.log(`=force-event`, event);
        events.set([...events.get(), event]);
      }
    }
  });
  const payload = events.get();
  if (payload.length) {
    events.set([]);
    eventSync(payload);
  }
  return true;
}
