//import { markdownPane } from "./compositor/markdownPane";
import { bgPane } from "./compositor/bgPane";
import type {
  MarkdownPaneProps,
  MarkdownPaneDatum,
  BgPaneDatum,
} from "../types";

export function compositor(
  payload: MarkdownPaneDatum | BgPaneDatum,
  markdown: MarkdownPaneProps[],
  paneHeight: [number, number, number]
) {
  if (payload.internal.type === `bgPane`) return bgPane(payload as BgPaneDatum);

  if (payload.internal.type === `markdown`) {
    const thisPayload = payload as MarkdownPaneDatum;
    // is modal shape
    if (thisPayload.isModal) {
      console.log(`modal markdown`);
      return <p>modal markdown</p>;
    }
    // uses textShapeOutside
    if (
      thisPayload.textShapeOutsideMobile !== `none` ||
      thisPayload.textShapeOutsideTablet !== `none` ||
      thisPayload.textShapeOutsideDesktop !== `none`
    ) {
      console.log(`shapeOutside modal`);
      return <p>shapeOutside modal</p>;
    }
    // has imageMaskShape **not implemented?
    if (
      thisPayload.imageMaskShapeMobile !== `none` ||
      thisPayload.imageMaskShapeTablet !== `none` ||
      thisPayload.imageMaskShapeDesktop !== `none`
    ) {
      console.log(`shapeOutside modal`);
      return <p>shapeOutside modal</p>;
    }
    // regular markdown
    return <p>markdown</p>;
    //return markdownPane(thisPayload as MarkdownPaneDatum, markdown, paneHeight);
    console.log(markdown, paneHeight);
  }
}
