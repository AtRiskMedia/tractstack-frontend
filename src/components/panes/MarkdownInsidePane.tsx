import PaneFromAst from "./PaneFromAst";
//import { SvgInsideLeft } from "../widgets/SvgInsideLeft";
//import { svgShapeOutside } from "../../utils/compositor/svgShapeOutside";
import { classNames } from "../../utils/helpers";
import type {
  FileNode,
  MarkdownPaneProps,
  MarkdownPaneDatum,
} from "../../types";

/*
const ParagraphMarkdownCompositor = (
  payload: IPaneFragmentMarkdown,
  viewportKey: string,
  paneHeight: number,
  hooks: IStoryFragmentCompositorHooks,
  parent: string,
  id: IStoryFragmentId
) => {
  const optionsPayload = payload.optionsPayload;
  const hasModal = payload?.isModal;
  const thisId = `${viewportKey}-${payload.id}-markdown`;
  const thisIdModal = `${viewportKey}-${payload.id}-modal`;
  const zIndex = ``; // `z-index: ${payload?.zindex || `100`};`
  const zIndexModal = ``; //hasModal
  //  ? `z-index: ${(payload.zindex - 1).toString() || `99`};`
  //  : false
  const thisTextShapeOutsideSelector =
    viewportKey === `desktop`
      ? payload.textShapeOutsideDesktop
      : viewportKey === `tablet`
      ? payload.textShapeOutsideTablet
      : viewportKey === `mobile`
      ? payload.textShapeOutsideMobile
      : payload.textShapeOutside;
  const thisImageMaskShapeSelector =
    viewportKey === `desktop`
      ? payload.imageMaskShapeDesktop
      : viewportKey === `tablet`
      ? payload.imageMaskShapeTablet
      : viewportKey === `mobile`
      ? payload.imageMaskShapeMobile
      : payload.imageMaskShape;
  const hasModalShapeOutside =
    hasModal && thisTextShapeOutsideSelector !== `none`
      ? thisTextShapeOutsideSelector
      : false;
  const isModal =
    typeof optionsPayload.modal !== `undefined` &&
    typeof optionsPayload.modal[viewportKey] !== `undefined`;
  const thisModalPayload = isModal ? optionsPayload.modal[viewportKey] : null;
  const hasModalShapeOutsidePayload =
    isModal && hasModalShapeOutside
      ? SvgShapeOutsidePayload(
          hasModalShapeOutside,
          viewportKey,
          thisIdModal,
          paneHeight,
          isModal,
          thisModalPayload
        )
      : false;
  const hasTextShapeOutsidePayload =
    thisTextShapeOutsideSelector &&
    typeof thisTextShapeOutsideSelector === `string`
      ? SvgShapeOutsidePayload(
          thisTextShapeOutsideSelector,
          viewportKey,
          thisId,
          paneHeight,
          isModal,
          thisModalPayload
        )
      : false;
  const hasMaskPayload =
    thisImageMaskShapeSelector && thisImageMaskShapeSelector.length
      ? SvgImageMaskPayload(thisImageMaskShapeSelector, thisId, viewportKey)
      : false;
  const hasModalMaskPayload =
    isModal && thisImageMaskShapeSelector && thisImageMaskShapeSelector?.length
      ? SvgImageMaskPayload(
          thisImageMaskShapeSelector,
          thisIdModal,
          viewportKey
        )
      : false;
  const cssModalMask = hasModalMaskPayload || ``;
  const imageDataArrayNew = payload?.relationships?.markdown?.map((e) => {
    return e?.relationships?.images?.concat(e?.relationships?.imagesSvg);
  })[0];
  const imageDataArray =
    typeof imageDataArrayNew === `object` &&
    Object.keys(imageDataArrayNew).length > 0
      ? imageDataArrayNew
      : payload?.relationships?.image;
  const htmlAst =
    payload?.markdownId &&
    payload?.relationships?.markdown.filter((e) => e.id === payload?.markdownId)
      .length
      ? payload?.relationships?.markdown.filter(
          (e) => e.id === payload?.markdownId
        )[0].childMarkdown?.childMarkdownRemark
      : payload?.childPaneFragment?.childMarkdownRemark;
  const astPayload = htmlAst && {
    ast: htmlAst?.htmlAst?.children,
    mode: `paragraph__markdown`,
    buttonData: optionsPayload?.buttons,
    imageData: imageDataArray,
    parent,
    viewportKey,
  };
  const hasClassNames = optionsPayload?.classNames;
  const hasClassNamesAll = optionsPayload?.classNames?.all;
  const hasClassNamesViewport =
    hasClassNames &&
    typeof optionsPayload.classNames[viewportKey] !== `undefined`;
  const injectClassNames = hasClassNamesAll
    ? optionsPayload.classNames.all
    : hasClassNamesViewport
    ? optionsPayload.classNames[viewportKey]
    : ``;
  const hasClassNamesParent = optionsPayload?.classNamesParent;
  const hasClassNamesParentAll =
    hasClassNamesParent && optionsPayload.classNamesParent.all;
  const hasClassNamesParentViewport =
    hasClassNamesParent &&
    typeof optionsPayload?.classNamesParent[viewportKey] !== `undefined`;
  const classNamesParent = hasClassNamesParentAll
    ? optionsPayload.classNamesParent.all
    : hasClassNamesParentViewport
    ? optionsPayload.classNamesParent[viewportKey]
    : ``;
  const hasClassNamesModal = optionsPayload?.classNamesModal;
  const hasClassNamesModalAll =
    hasClassNamesModal && optionsPayload.classNamesModal.all;
  const hasClassNamesModalViewport =
    hasClassNamesModal &&
    typeof optionsPayload?.classNamesModal[viewportKey] !== `undefined`;
  const classNamesModal = hasClassNamesModalAll
    ? optionsPayload.classNamesModal.all
    : hasClassNamesModalViewport
    ? optionsPayload.classNamesModal[viewportKey]
    : ``;
  const markdownArray = astPayload ? (
    HtmlAstToReact(
      astPayload,
      false,
      injectClassNames,
      hooks,
      {},
      { ...id, viewportKey }
    )
  ) : (
    <></>
  );
  const cssMask = hasMaskPayload || ``;
  const cssTextShapeOutside = hasTextShapeOutsidePayload
    ? hasTextShapeOutsidePayload.css
    : ``;
  const cssShapeOutsideModal = hasModalShapeOutsidePayload
    ? hasModalShapeOutsidePayload.css
    : ``;
  const css = `#${thisId} { ${zIndex} ${cssMask} } ${cssTextShapeOutside} `;
  const cssModal = hasModal
    ? `#${thisIdModal} { ${zIndexModal} ${cssModalMask} } ${cssShapeOutsideModal} `
    : ``;
  let working: any;
  if (!classNamesParent) working = markdownArray;
  else if (typeof classNamesParent === `string`)
    working = <div className={classNamesParent}>{markdownArray}</div>;
  else
    classNamesParent.reverse().forEach((e: any) => {
      if (typeof working === `undefined`)
        working = <div className={e}>{markdownArray}</div>;
      else working = <div className={e}>{working}</div>;
    });
  const thisMarkdown = working;
  const jsxMarkdown = hasTextShapeOutsidePayload ? (
    <div
      id={thisId}
      key={thisId}
      className={`paneFragment paneFragment-${viewportKey} paneFragmentParagraphOutside`}
    >
      {hasTextShapeOutsidePayload.left}
      {hasTextShapeOutsidePayload.right}
      {thisMarkdown}
    </div>
  ) : (
    <div
      id={thisId}
      key={thisId}
      className="paneFragment paneFragmentParagraph"
    >
      {thisMarkdown}
    </div>
  );
  const jsxModal =
    hasModalShapeOutsidePayload &&
    typeof hasModalShapeOutsidePayload === `object` ? (
      <div
        id={`${thisIdModal}`}
        key={`${thisIdModal}`}
        className={classNames(
          `paneFragment paneFragmentModal`,
          classNamesModal
        )}
      >
        {hasModalShapeOutsidePayload?.shape}
      </div>
    ) : null;
  const thisJsx = !isModal ? [jsxMarkdown] : [jsxModal, jsxMarkdown];
  return {
    children: thisJsx,
    css: `${css} ${cssModal}`,
  };
};
*/

export function MarkdownInsidePane({
  payload,
  markdown,
  files,
  paneHeight,
}: {
  payload: MarkdownPaneDatum;
  markdown: MarkdownPaneProps[];
  files: FileNode[];
  paneHeight: [number, number, number];
}) {
  const hasHidden =
    payload.hiddenViewports.includes(`desktop`) ||
    payload.hiddenViewports.includes(`tablet`) ||
    payload.hiddenViewports.includes(`mobile`);
  const hidden = hasHidden
    ? ``.concat(
        payload.hiddenViewports.includes(`desktop`)
          ? `xl:hidden`
          : `xl:visible`,
        payload.hiddenViewports.includes(`tablet`) ? `md:hidden` : `md:visible`,
        payload.hiddenViewports.includes(`mobile`) ? `hidden` : `visible`
      )
    : ``;
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
      console.log(
        paneHeight[
          viewportKey === `desktop` ? 2 : viewportKey === `tablet` ? 1 : 0
        ],
        shapeName
      );
      //const shapeOutsidePayload =
      //  thisTextShapeOutsideSelector &&
      //  typeof thisTextShapeOutsideSelector === `string`
      //    ? svgShapeOutside(
      //        thisTextShapeOutsideSelector,
      //        viewportKey,
      //        paneHeight,
      //      )
      //    : false;
      //    console.log(shapeOutsidePayload)

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
              hidden,
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
              <PaneFromAst
                payload={astPayload}
                thisClassNames={injectClassNames}
                memory={{}}
                id={thisMarkdown.id}
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
              className={classNames(
                idx === 0 ? hidden : ``,
                children?.at(0) || ``,
                baseClasses[viewportKey],
                `h-fit-contents`
              )}
            >
              <div
                className="relative w-full h-full justify-self-start"
                style={paneFragmentStyle}
              >
                <PaneFromAst
                  payload={astPayload}
                  thisClassNames={injectClassNames}
                  memory={{}}
                  id={thisMarkdown.id}
                  idx={0}
                />
              </div>
            </div>
          );
        return (
          <div
            key={`t8k-${thisMarkdown.id}-parent-${idx}`}
            className={classNames(
              idx === 0 ? hidden : ``,
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
