import { CONCIERGE_SYNC_INTERVAL } from "../constants";
import { events, locked } from "../store/events";
import { auth } from "../store/auth";

export async function eventStream() {
  async function init() {
    if (!locked.get())
      try {
        const payload = events.get();
        if (payload.length) {
          events.set([]);
          auth.setKey("lastRun", Date.now().toString());
          //payload.forEach((e:any)=>{
          //  console.log(`event`,e.id);
          //})
          console.log(`send to concierge`, payload);
        }
      } catch (e) {
        console.log(`error establishing concierge eventStream`, e);
      } finally {
        setTimeout(init, CONCIERGE_SYNC_INTERVAL);
      }
  }
  setTimeout(init, CONCIERGE_SYNC_INTERVAL);
}
