import { BgPane } from "./panes/BgPane";
import { MarkdownPane } from "./panes/MarkdownPane";
import { MarkdownInsidePane } from "./panes/MarkdownInsidePane";
import { Modal } from "./panes/Modal";
import { MarkdownInsideModal } from "./panes/MarkdownInsideModal";
import { classNames } from "../utils/helpers";
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
  paneId,
  hasYTAutoplay,
}: {
  payload: MarkdownPaneDatum | BgPaneDatum;
  markdown: MarkdownPaneProps[];
  files: FileNode[];
  paneHeight: [number, number, number];
  paneId: string;
  hasYTAutoplay: string | null;
}) {
  switch (payload.internal.type) {
    case `bgPane`: {
      const thisPayload = payload as BgPaneDatum;
      return <BgPane payload={thisPayload} />;
    }

    case `markdown`: {
      const thisPayload = payload as MarkdownPaneDatum;

      // has modal shape?
      const thisModalPayload =
        thisPayload.isModal &&
        typeof thisPayload?.optionsPayload?.modal !== `undefined`
          ? thisPayload.optionsPayload.modal
          : null;
      if (thisPayload.isModal && thisModalPayload) {
        const hasHidden =
          payload.hiddenViewports.includes(`desktop`) ||
          payload.hiddenViewports.includes(`tablet`) ||
          payload.hiddenViewports.includes(`mobile`);
        const hidden = hasHidden
          ? ``.concat(
              payload.hiddenViewports.includes(`desktop`)
                ? `xl:hidden`
                : `xl:grid`,
              payload.hiddenViewports.includes(`tablet`)
                ? `md:hidden`
                : `md:grid`,
              payload.hiddenViewports.includes(`mobile`) ? `hidden` : `grid`
            )
          : `grid`;
        const paneFragmentStyle = {
          gridArea: "1/1/1/1",
        };
        return (
          <div
            className={classNames(hidden, `h-fit-contents`)}
            id={`t8k-${thisPayload.id}-modal-container`}
            key={`t8k-${thisPayload.id}-modal-container`}
          >
            <div
              className="relative w-full h-full justify-self-start"
              style={paneFragmentStyle}
            >
              <Modal payload={thisPayload} modalPayload={thisModalPayload} />
            </div>
            <div
              className="relative w-full h-full justify-self-start"
              style={paneFragmentStyle}
            >
              <MarkdownInsideModal
                payload={thisPayload}
                markdown={markdown}
                files={files}
                paneHeight={paneHeight}
                modalPayload={thisModalPayload}
                paneId={paneId}
              />
            </div>
          </div>
        );
      }

      // uses textShapeOutside?
      if (
        thisPayload.textShapeOutsideMobile !== `none` ||
        thisPayload.textShapeOutsideTablet !== `none` ||
        thisPayload.textShapeOutsideDesktop !== `none`
      ) {
        return (
          <MarkdownInsidePane
            payload={thisPayload}
            markdown={markdown}
            files={files}
            paneHeight={paneHeight}
            paneId={paneId}
          />
        );
      }

      // regular markdown
      return (
        <MarkdownPane
          payload={thisPayload}
          markdown={markdown}
          files={files}
          paneId={paneId}
          hasYTAutoplay={hasYTAutoplay}
        />
      );
    }
  }
}
