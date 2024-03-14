//import { markdownPane } from "./compositor/markdownPane";
import { bgPane } from "./compositor/bgPane";
import type {
  MarkdownPaneProps,
  MarkdownPaneDatum,
  BgPaneDatum,
} from "../types";
import { markdownPane } from "./compositor/markdownPane";

export function compositor(
  payload: MarkdownPaneDatum | BgPaneDatum,
  markdown: MarkdownPaneProps[],
  paneHeight: [number, number, number]
) {
  switch (payload.internal.type) {
    case `bgPane`:
      return bgPane(payload as BgPaneDatum);

    case `markdown`: {
      const thisPayload = payload as MarkdownPaneDatum;

      // has modal shape?
      if (thisPayload.isModal) {
        return <p>modal markdown</p>;
      }

      // uses textShapeOutside?
      if (
        thisPayload.textShapeOutsideMobile !== `none` ||
        thisPayload.textShapeOutsideTablet !== `none` ||
        thisPayload.textShapeOutsideDesktop !== `none`
      ) {
        return <p>shapeOutside modal</p>;
      }

      // has imageMaskShape **not implemented?
      if (
        thisPayload.imageMaskShapeMobile !== `none` ||
        thisPayload.imageMaskShapeTablet !== `none` ||
        thisPayload.imageMaskShapeDesktop !== `none`
      ) {
        console.log(`imageMaskShape markdown`, paneHeight);
        return <p>imageMaskShape **not implemented</p>;
      }

      // regular markdown
      return markdownPane(thisPayload, markdown);
    }
  }
}
