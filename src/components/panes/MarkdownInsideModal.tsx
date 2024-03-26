import PaneFromAst from "./PaneFromAst";
import { SvgInsideLeftModal } from "../widgets/SvgInsideLeftModal";
import { SvgInsideRightModal } from "../widgets/SvgInsideRightModal";
import { classNames } from "../../utils/helpers";
import type {
  FileNode,
  MarkdownPaneProps,
  MarkdownPaneDatum,
} from "../../types";

export function MarkdownInsideModal({
  payload,
  markdown,
  files,
  paneHeight,
  modalPayload,
  paneId,
}: {
  payload: MarkdownPaneDatum;
  markdown: MarkdownPaneProps[];
  files: FileNode[];
  paneHeight: [number, number, number];
  modalPayload: {
    [key: string]: {
      zoomFactor: number;
      paddingLeft: number;
      paddingTop: number;
    };
  };
  paneId: string;
}) {
  const thisMarkdown = markdown
    .filter((m: MarkdownPaneProps) => m.id === payload.markdownId)
    .at(0)!;

  const optionsPayload = payload.optionsPayload;
  const thisId = `markdownPane-${thisMarkdown.id}`;
  const baseClasses: { [key: string]: string } = {
    mobile: `md:hidden`,
    tablet: `hidden md:grid xl:hidden`,
    desktop: `hidden xl:grid`,
  };
  const paneFragmentStyle = {
    gridArea: "1/1/1/1",
  };

  return [`mobile`, `tablet`, `desktop`]
    .map((viewportKey: string) => {
      if (payload.hiddenViewports.includes(viewportKey)) return null;

      const shapeName =
        viewportKey === `desktop`
          ? payload.textShapeOutsideDesktop
          : viewportKey === `tablet`
            ? payload.textShapeOutsideTablet
            : viewportKey === `mobile`
              ? payload.textShapeOutsideMobile
              : payload.textShapeOutside;
      if (!shapeName)
        return <div key={`t8k-${thisMarkdown.id}-parent-${viewportKey}`} />;

      const astPayload = {
        ast: thisMarkdown.htmlAst.children,
        buttonData: optionsPayload?.buttons || {},
        imageData: files,
      };
      const injectClassNames = optionsPayload?.classNames?.all || {};
      const classNamesParent = optionsPayload?.classNamesParent
        ? optionsPayload.classNamesParent?.all
        : ``;

      if (typeof classNamesParent === `string`) {
        return (
          <div
            className={classNames(
              classNamesParent,
              baseClasses[viewportKey],
              `h-fit-contents`
            )}
            id={thisId}
            key={`t8k-${thisMarkdown.id}-parent-${viewportKey}`}
          >
            <div
              className="relative w-full h-full justify-self-start"
              style={paneFragmentStyle}
            >
              <SvgInsideLeftModal
                shapeName={shapeName}
                viewportKey={viewportKey}
                id={thisMarkdown.id}
                paneHeight={
                  paneHeight[
                    viewportKey === `desktop`
                      ? 2
                      : viewportKey === `tablet`
                        ? 1
                        : 0
                  ]
                }
                modalPayload={modalPayload[viewportKey]}
              />
              <SvgInsideRightModal
                shapeName={shapeName}
                viewportKey={viewportKey}
                id={thisMarkdown.id}
                paneHeight={
                  paneHeight[
                    viewportKey === `desktop`
                      ? 2
                      : viewportKey === `tablet`
                        ? 1
                        : 0
                  ]
                }
                modalPayload={modalPayload[viewportKey]}
              />
              <PaneFromAst
                payload={astPayload}
                thisClassNames={injectClassNames}
                memory={{}}
                id={thisMarkdown.id}
                paneId={paneId}
                idx={0}
              />
            </div>
          </div>
        );
      }

      // multiple parent layers
      const wrap = (children: string[], idx: number) => {
        if (children.length === 1)
          return (
            <div
              key={`t8k-${thisMarkdown.id}-parent-${idx}-${viewportKey}`}
              className={classNames(children?.at(0) || ``, `h-fit-contents`)}
            >
              <div
                className="relative w-full h-full justify-self-start"
                style={paneFragmentStyle}
              >
                <SvgInsideLeftModal
                  shapeName={shapeName}
                  viewportKey={viewportKey}
                  id={thisMarkdown.id}
                  paneHeight={
                    paneHeight[
                      viewportKey === `desktop`
                        ? 2
                        : viewportKey === `tablet`
                          ? 1
                          : 0
                    ]
                  }
                  modalPayload={modalPayload[viewportKey]}
                />
                <SvgInsideRightModal
                  shapeName={shapeName}
                  viewportKey={viewportKey}
                  id={thisMarkdown.id}
                  paneHeight={
                    paneHeight[
                      viewportKey === `desktop`
                        ? 2
                        : viewportKey === `tablet`
                          ? 1
                          : 0
                    ]
                  }
                  modalPayload={modalPayload[viewportKey]}
                />
                <PaneFromAst
                  payload={astPayload}
                  thisClassNames={injectClassNames}
                  memory={{}}
                  id={thisMarkdown.id}
                  paneId={paneId}
                  idx={0}
                />
              </div>
            </div>
          );
        return (
          <div
            key={`t8k-${thisMarkdown.id}-parent-${idx}`}
            className={classNames(
              idx === 0 ? baseClasses[viewportKey] : ``,
              children?.at(0) || ``
            )}
          >
            {wrap(children.slice(1), idx + 1)}
          </div>
        );
      };
      return wrap(classNamesParent, 0);
    })
    .filter(n => n);
}
