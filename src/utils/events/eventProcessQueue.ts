import { events, panesVisible, current } from "../../store/events";
import { THRESHOLD_READ, THRESHOLD_GLOSSED } from "../../constants";

export async function eventProcessQueue() {
  const panes = panesVisible.get();
  console.log(panes);
  Object.keys(panes).forEach((id: string) => {
    console.log(id);
    const value = panes[id];
    console.log(value);
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
        console.log(verb);
        const event = {
          id: id,
          parentId: current.get().id || undefined,
          type: `Pane`,
          verb: verb,
          duration: diff,
        };
        console.log(`=force-event`, event);
        events.set([...events.get(), event]);
      }
    }
  });
  return true;
}
