import { preParseClicked } from "../../utils/concierge/preParseClicked";
import { preParseBunny } from "../../utils/concierge/preParseBunny";
import {
  events,
  storyFragmentBunnyWatch,
  contextBunnyWatch,
} from "../../store/events";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function AstToButton({
  text,
  className,
  callbackPayload,
  targetUrl,
  paneId,
  slug,
}: {
  text: string;
  className: string;
  callbackPayload: any;
  targetUrl: string;
  paneId: string;
  slug: string;
}) {
  const bunny = preParseBunny(callbackPayload);
  const event = preParseClicked(paneId, callbackPayload);
  const pushEvent = function (): void {
    if (bunny) {
      if (bunny.isContext) contextBunnyWatch.set({ slug, t: bunny.t });
      else storyFragmentBunnyWatch.set({ slug, t: bunny.t });
      const targetDiv = document.getElementById(`bunny`);
      if (targetDiv) {
        targetDiv.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (event) events.set([...events.get(), event]);
  };
  // if this is a bunny video event, check if same page
  if (bunny && bunny.slug === slug) {
    return (
      <button
        className={className}
        onClick={() => pushEvent()}
        title={targetUrl}
      >
        {text}
      </button>
    );
  }
  return (
    <a
      type="button"
      className={className}
      onClick={() => pushEvent()}
      href={targetUrl}
      title={targetUrl}
    >
      {text}
    </a>
  );
}
