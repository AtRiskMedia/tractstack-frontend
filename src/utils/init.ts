import { inView } from "./inView";
import { eventStream } from "./eventStream";
import { events, current, locked } from "../store/events";
import { eventProcessQueue } from "./eventProcessQueue";

export function init() {
  class Link extends HTMLElement {
    constructor() {
      super();
      const id = this.dataset.id;
      const a = this.querySelector("a");
      if (a)
        a.addEventListener("click", async () => {
          locked.set(true);
          eventProcessQueue();
        });
    }
  }
  customElements.define("astro-link", Link);

  class StoryFragment extends HTMLElement {
    constructor() {
      super();
      const id = this.dataset.id;
      if (id) current.set(JSON.parse(id));
      this.querySelector("ul");
    }
  }
  customElements.define("astro-storyfragment", StoryFragment);

  class Pane extends HTMLElement {
    constructor() {
      super();
      this.querySelector("li");
    }
  }
  customElements.define("astro-pane", Pane);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const utmSource = params[`utm_source`] || undefined;
  const utmMedium = params[`utm_medium`] || undefined;
  const utmCampaign = params[`utm_campaign`] || undefined;
  const utmTerm = params[`utm_term`] || undefined;
  const utmContent = params[`utm_content`] || undefined;
  const internal =
    document.referrer.indexOf(location.protocol + "//" + location.host) === 0;

  if (utmSource)
    console.log(
      `params: source=${utmSource} medium=${utmMedium} campaign=${utmCampaign} term=${utmTerm} content=${utmContent}`
    );
  if (!internal) {
    console.log(`entered from external link`, document.referrer, 1);
    const event = {
      id: current.get().id,
      parentId: current.get().parentId,
      type: `StoryFragment`,
      verb: `ENTERED`,
    };
    events.set([...events.get(), event]);
  }

  eventStream();
  inView();
}
