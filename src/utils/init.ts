import { getTokens } from "../api/axiosClient";
import { events, current } from "../store/events";

export function init() {
  console.log(`init`);

  // check for utmParams
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const utmSource = params[`utm_source`] || undefined;
  const utmMedium = params[`utm_medium`] || undefined;
  const utmCampaign = params[`utm_campaign`] || undefined;
  const utmTerm = params[`utm_term`] || undefined;
  const utmContent = params[`utm_content`] || undefined;
  if (utmSource)
    console.log(
      `params: source=${utmSource} medium=${utmMedium} campaign=${utmCampaign} term=${utmTerm} content=${utmContent}`
    );

  // must pass utmSource and fingerprint if avail
  if (import.meta.env.PROD) getTokens();
  else console.log(`DEV MODE: not connecting to concierge`);

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

  const internal =
    document.referrer.indexOf(location.protocol + "//" + location.host) === 0;
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
}
