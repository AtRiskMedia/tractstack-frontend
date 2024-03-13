//import { htmlAstToReact } from "./htmlAstToReact";
import type { MarkdownPaneProps, MarkdownPaneDatum } from "../../types";

export function markdownPane(
  payload: MarkdownPaneDatum,
  markdown: MarkdownPaneProps[]
) {
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

  const imageDataArrayNew = thisMarkdown.image.concat(thisMarkdown.imageSvg);
  const imageDataArray =
    Object.keys(imageDataArrayNew).length > 0 ? imageDataArrayNew : [];
  const astPayload = {
    ast: thisMarkdown.htmlAst.children,
    mode: `paragraph__markdown`,
    buttonData: optionsPayload?.buttons,
    imageData: imageDataArray,
  };
  const injectClassNames = optionsPayload?.classNames?.all || {};
  const classNamesParent = optionsPayload?.classNamesParent
    ? optionsPayload.classNamesParent?.all
    : ``;

  const markdownArray = <p>{thisMarkdown.body}</p>;
  /* astPayload ? (
      htmlAstToReact(
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
    */
console.log(hidden,astPayload,injectClassNames)

  if (typeof classNamesParent === `string`) {
    return (
      <div id={thisId} key={thisId}>
        {markdownArray}
      </div>
    );
  }

  const wrap = (children: string[]) => {
    if (children.length === 0)
      return <div className={children.at(0)}>{markdownArray}</div>;
    return <div className={children.at(0)}>{wrap(children.slice(1))}</div>;
  };
  const classes = classNamesParent as string[]
  const children = wrap(classes.toReversed());
  return (
    <div id={thisId} key={thisId}>
      {children}
    </div>
  );
}

/*
export function markdownPane(
  payload: MarkdownPaneDatum,
  markdown: MarkdownPaneProps[],
  paneHeight: [number, number, number]
) {
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

  [`mobile`, `tablet`, `desktop`].forEach((viewportKey: string) => {
    const thisPaneHeight =
      viewportKey === `mobile`
        ? paneHeight[0]
        : viewportKey === `tablet`
          ? paneHeight[1]
          : paneHeight[2];
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
        ? svgShapeOutsidePayload(
            hasModalShapeOutside,
            viewportKey,
            thisIdModal,
            thisPaneHeight,
            isModal,
            thisModalPayload
          )
        : false;
    const hasTextShapeOutsidePayload =
      thisTextShapeOutsideSelector &&
      typeof thisTextShapeOutsideSelector === `string`
        ? svgShapeOutsidePayload(
            thisTextShapeOutsideSelector,
            viewportKey,
            thisId,
            thisPaneHeight,
            isModal,
            thisModalPayload
          )
        : false;
    const hasMaskPayload =
      thisImageMaskShapeSelector && thisImageMaskShapeSelector.length
        ? svgImageMask(thisImageMaskShapeSelector, thisId, viewportKey)
        : false;
    const hasModalMaskPayload =
      isModal &&
      thisImageMaskShapeSelector &&
      thisImageMaskShapeSelector?.length
        ? svgImageMask(thisImageMaskShapeSelector, thisIdModal, viewportKey)
        : false;
    const cssModalMask = hasModalMaskPayload || ``;
    const imageDataArrayNew = payload?.relationships?.markdown?.map(e => {
      return e?.relationships?.images?.concat(e?.relationships?.imagesSvg);
    })[0];
    const imageDataArray =
      typeof imageDataArrayNew === `object` &&
      Object.keys(imageDataArrayNew).length > 0
        ? imageDataArrayNew
        : payload?.relationships?.image;
    const htmlAst =
      payload?.markdownId &&
      payload?.relationships?.markdown.filter(e => e.id === payload?.markdownId)
        .length
        ? payload?.relationships?.markdown.filter(
            e => e.id === payload?.markdownId
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
      ? optionsPayload?.classNamesParent?.all || ``
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
      ? optionsPayload?.classNamesModal?.all || ``
      : hasClassNamesModalViewport
        ? optionsPayload.classNamesModal[viewportKey]
        : ``;
    const markdownArray = astPayload ? (
      htmlAstToReact(
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
    const thisMarkdownRaw = working;
    const jsxMarkdown = hasTextShapeOutsidePayload ? (
      <div
        id={thisId}
        key={thisId}
        className={`paneFragment paneFragment-${viewportKey} paneFragmentParagraphOutside`}
      >
        {hasTextShapeOutsidePayload.left}
        {hasTextShapeOutsidePayload.right}
        {thisMarkdownRaw}
      </div>
    ) : (
      <div
        id={thisId}
        key={thisId}
        className="paneFragment paneFragmentParagraph"
      >
        {thisMarkdownRaw}
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

    //console.log(jsxMarkdown, jsxModal);
  });

  return (
    <div className={classNames(`w-full h-full`, hidden)}>
      {thisMarkdown.body}
    </div>
  );
}
 */
