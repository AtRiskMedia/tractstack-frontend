/* eslint-disable @typescript-eslint/no-explicit-any */
export function bgPane(payload: any) {
  console.log(payload.id)
  // filter on hiddenViewports and don't return
  return [
    <div key="mobile" className="visible md:hidden" />,
    <div key="tablet" className="hidden md:visible xl:hidden" />,
    <div key="desktop" className="hidden xl:visible" />,
  ];
}

    /*
    case `bgPane`:
    {
      const optionsPayload = payload.optionsPayload;
      const hasArtpack = optionsPayload?.artpack;
      const hasArtpackAll = hasArtpack?.all;
      const hasArtpackViewport =
        hasArtpack &&
        typeof hasArtpack[viewportKey] !== `undefined` &&
        hasArtpack[viewportKey];
      const artpack = (hasArtpack && hasArtpackAll) || hasArtpackViewport;
      const artpackMode = artpack?.mode;
      const artpackFiletype = artpack?.filetype;
      const artpackCollection = artpack?.collection;
      const viewportPrefix =
        viewportKey === `desktop` || viewportKey === `tablet` ? `1920` : `800`;
      const filenamePrefix =
        artpackCollection !== `custom` ? `${artpackCollection}-` : ``;
      const artpackImage = artpack?.image;
      const thisId = `${viewportKey}-${payload.id}-pane`;
      const thisShapeSelector =
        viewportKey === `desktop`
          ? payload.shapeDesktop
          : viewportKey === `tablet`
            ? payload.shapeTablet
            : viewportKey === `mobile`
              ? payload.shapeMobile
              : payload.shape;
      const shapeName = thisShapeSelector !== `none` ? thisShapeSelector : null;
      const shape =
        typeof shapeName === `string` ? (
          Svg(shapeName, viewportKey, thisId)
        ) : (
          <></>
        );
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

      // modes -- standard = as-is
      // break = use artpack, show svg (from shapes), no mask
      // mask = use artpack, show image via css url, apply mask via css

      const breakSvg =
        artpackMode === `break` &&
        typeof artpackImage === `string` &&
        typeof artpackCollection === `string`
          ? Svg(`${artpackCollection}${artpackImage}`, thisId, viewportKey)
          : false;
      const breakSvgFill =
        breakSvg && typeof artpack?.svgFill === `string`
          ? artpack.svgFill
          : `none`;
      const maskSvg =
        artpackMode === `mask` && shapeName
          ? SvgImageMaskPayload(shapeName, thisId, viewportKey)
          : false;
      const maskObjectFit =
        maskSvg && typeof artpack?.objectFit === `string`
          ? artpack.objectFit
          : `cover`;
      const thisShape = breakSvg || (maskSvg ? <></> : shape);
      const breakCss = breakSvg
        ? `#${thisId} svg { fill: ${breakSvgFill}; }`
        : ``;
      const url = `/${artpackCollection}-artpack/${viewportPrefix}/${filenamePrefix}${artpackImage}.${artpackFiletype}`;
      const maskCss =
        maskSvg &&
        artpackCollection &&
        artpackImage &&
        artpackFiletype &&
        maskObjectFit
          ? `#${thisId} { background:url('${url}'); background-size:${maskObjectFit}; ${zIndex} ${maskSvg} }`
          : ``;
      const css = `#${thisId} { ${zIndex} } ${breakCss} ${maskCss}`;
      console.log(css);
      return (
        <div
          id={thisId}
          key={thisId}
          className={classNames(
            `paneFragment paneFragmentShape`,
            classNamesParent
          )}
        >
          {thisShape}
        </div>
      );
      }
*/


