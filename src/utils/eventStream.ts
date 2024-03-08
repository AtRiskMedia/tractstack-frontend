import { CONCIERGE_SYNC_INTERVAL } from "../constants";
import { lastRun, events } from "../store/events";

export async function eventStream() {
  async function init() {
    try {
      lastRun.set(Date.now());
      const payload = events.get();
      if(payload.length) console.log(`send to concierge`,payload)
    } catch (e) {
      console.log(`error establishing concierge eventStream`, e);
    } finally {
      setTimeout(init, CONCIERGE_SYNC_INTERVAL);
    }
  }
  setTimeout(init, CONCIERGE_SYNC_INTERVAL);
}
