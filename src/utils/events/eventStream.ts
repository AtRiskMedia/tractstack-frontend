import { CONCIERGE_SYNC_INTERVAL } from "../../constants";
import { events, loaded } from "../../store/events";
import { eventSync } from "./eventSync";

export async function eventStream() {
  async function init() {
    try {
      const payload = events.get();
      if (payload.length) {
        //events.set([]);
        //console.log(`not clearing event queue`);
        eventSync(payload);
      }
    } catch (e) {
      console.log(`error establishing concierge eventStream`, e);
    } finally {
      setTimeout(init, CONCIERGE_SYNC_INTERVAL);
    }
  }
  if (!loaded.get()) {
    loaded.set(true);
    setTimeout(init, CONCIERGE_SYNC_INTERVAL);
  }
}
