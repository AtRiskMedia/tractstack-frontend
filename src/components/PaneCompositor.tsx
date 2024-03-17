import { BgPane } from "./panes/BgPane";
import { MarkdownPane } from "./panes/MarkdownPane";
import type {
  MarkdownPaneProps,
  MarkdownPaneDatum,
  FileNode,
  BgPaneDatum,
} from "../types";

export function PaneCompositor({
  payload,
  markdown,
  files,
  paneHeight,
}: {
  payload: MarkdownPaneDatum | BgPaneDatum;
  markdown: MarkdownPaneProps[];
  files: FileNode[];
  paneHeight: [number, number, number];
}) {
  switch (payload.internal.type) {
    case `bgPane`: {
      const thisPayload = payload as BgPaneDatum;
      return <BgPane payload={thisPayload} />;
    }

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
      return (
        <MarkdownPane payload={thisPayload} markdown={markdown} files={files} />
      );
    }
  }
}
