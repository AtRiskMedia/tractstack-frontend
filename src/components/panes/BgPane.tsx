import { Svg } from "@components/widgets/Svg";
import { classNames } from "../../utils/helpers";
import { svgImageMask } from "../../utils/compositor/svgImageMask";
import type { BgPaneDatum } from "../../types";

export function BgPane({ payload }: { payload: BgPaneDatum }) {
  const optionsPayload = payload.optionsPayload;
  const hasArtpack = optionsPayload?.artpack;
  const hasArtpackAll = hasArtpack?.all;
  const baseClasses: { [key: string]: string } = {
    mobile: `md:hidden`,
    tablet: `hidden md:block xl:hidden`,
    desktop: `hidden xl:block`,
  };

  return [`mobile`, `tablet`, `desktop`]
    .map((viewportKey: string) => {
      if (payload.hiddenViewports.includes(viewportKey)) return null;

      // check for artpack payload
      const hasArtpackViewport =
        hasArtpack &&
        typeof hasArtpack[viewportKey] !== `undefined` &&
        hasArtpack[viewportKey];
      const artpack = (hasArtpack && hasArtpackAll) || hasArtpackViewport;
      const artpackMode = artpack ? artpack.mode : null;
      const artpackFiletype = artpack ? artpack.filetype : null;
      const artpackCollection = artpack ? artpack.collection : null;
      const viewportPrefix =
        viewportKey === `desktop` || viewportKey === `tablet` ? `1920` : `800`;
      const filenamePrefix =
        artpackCollection !== `custom` ? `${artpackCollection}-` : ``;
      const artpackImage = artpack ? artpack.image : null;

      // check for shape mask
      const thisShapeSelector =
        viewportKey === `desktop`
          ? payload.shapeDesktop
          : viewportKey === `tablet`
            ? payload.shapeTablet
            : viewportKey === `mobile`
              ? payload.shapeMobile
              : payload.shape;
      const shapeName = thisShapeSelector !== `none` ? thisShapeSelector : null;
      const thisId = `${viewportKey}-${payload.id}-pane`;

      // check for tailwind classes
      const hasClassNamesParent = optionsPayload?.classNamesParent;
      const classNamesParent =
        hasClassNamesParent &&
        typeof optionsPayload?.classNamesParent?.all !== `undefined`
          ? optionsPayload.classNamesParent.all
          : typeof optionsPayload?.classNamesParent !== `undefined` &&
              typeof optionsPayload?.classNamesParent[viewportKey] !==
                `undefined`
            ? optionsPayload.classNamesParent[viewportKey]
            : ``;

      // based on artpack mode
      // break = use artpack, show svg (from shapes), no mask
      // mask = use artpack, show image via css url, apply mask via css
      // else just show shape
      //
      switch (artpackMode) {
        case `break`: {
          const breakSvgFill = artpack ? artpack.svgFill : `none`;
          const breakCss = breakSvgFill ? { fill: breakSvgFill } : {};
          return (
            <div
              key={`${viewportKey}-${payload.id}`}
              className={baseClasses[viewportKey]}
              style={breakCss}
            >
              <Svg
                shapeName={`${artpackCollection}${artpackImage}`}
                viewportKey={viewportKey}
                id={thisId}
              />
            </div>
          );
        }

        case `mask`: {
          // uses empty div; background-url added via css
          const maskSvg =
            artpackMode === `mask` && shapeName
              ? svgImageMask(shapeName, thisId, viewportKey)
              : null;
          const maskObjectFit =
            maskSvg && artpack ? artpack.objectFit : `cover`;
          const url = `url(/${artpackCollection}-artpack/${viewportPrefix}/${filenamePrefix}${artpackImage}.${artpackFiletype})`;
          const maskCss =
            maskSvg &&
            artpackCollection &&
            artpackImage &&
            artpackFiletype &&
            maskObjectFit
              ? {
                  backgroundImage: url,
                  backgroundSize: maskObjectFit,
                  WebkitMaskImage: `url("data:image/svg+xml;base64,PHN2ZyBpZD0ic3ZnX19kZXNrdG9wLTBjNDg4M2U4LTE1NTEtNGU4NS1hYWNjLTgwMGJmZmMwZmZkOS1wYW5lIiBkYXRhLW5hbWU9InN2Z19fY29taWMxOTIwcjNtYWluMi0tZGVza3RvcCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTkyMCAxMTIxIiBjbGFzcz0ic3ZnIHN2Z19fY29taWMxOTIwcjNtYWluMiBzdmdfX2NvbWljMTkyMHIzbWFpbjItLWRlc2t0b3AiPjxkZXNjIGlkPSJkZXNjIj5kZWNvcmF0aXZlIGJhY2tncm91bmQ8L2Rlc2M+PGc+PHBhdGggZD0iTSAxOTA0LDE3LjEzNTkzIFYgMTA5MS4wNDgyIGEgMjMuMjkwNDgzLDIzLjI3MDI2MyAwIDAgMSAtNC41MTUyLDEuNTY2NSBjIC0zMS40MDgsNC4wMzU0IC02Mi44MDU5LDcuOTMxOSAtOTQuNTQxNCw4LjU5NjIgLTIyMi4xOTczLDQuMzkyMyAtNDQ0LjQzNDMsMC43MzM4IC02NjYuNjQxNiwxLjk4MyAtMS4zMjk4LDAgLTIuNjQ5NiwwIC0zLjk2OTQsMCAtMTcuNzgyOSwtMC41NjUxIC0yNi4zMTcyLC02LjgyMTUgLTI5Ljk4ODksLTI0LjE2MjYgLTUuNzg1NCwtMjcuMzY1MSAtMTAuODA2NywtNTQuODg4OCAtMTUuOTc2OCwtODIuMzgyODYgLTE0Ljc2NjIsLTc4LjYxNTI0IC0yOS4zMTQxLC0xNTcuMjcwMTEgLTQ0LjIwOTMsLTIzNS44NjU1MSBRIDEwMTkuMDYwOSw2MjguMzM5NzQgOTkzLjU0NzUzLDQ5NS45ODU3OCBjIC0xMi40NDQwNywtNjQuOTcyMzEgLTI1LjA3NjcsLTEyOS44ODUxMyAtMzcuMjYyNzYsLTE5NC45MTY5NSAtNC4xMTgyNiwtMjEuOTcxNDEgLTYuODA3NTQsLTQ0LjIwMDYyIC0xMC42OTc1NCwtNjYuMjExNjcgLTUuMzI4OTQsLTMwLjE1MTIxIC0xMS4zMjI3NCwtNjAuMTczNTIgLTE2LjcxMTIsLTkwLjMwNDg5IGEgOTIuNjQ1OTA5LDkyLjU2NTQ3NiAwIDAgMSAtMC45OTIzNSwtMTguNjEwMjYgMTIuNzAyMDk2LDEyLjY5MTA2OCAwIDAgMSA4LjYyMzUzLC0xMi4xMjU5MiBjIDQuMjc3MDIsLTEuNjA2MjIgOC42OTMsLTMuMzExNTggMTMuMTc4NDIsLTMuODc2NzMgMjcuMTUwNzQsLTMuNDUwMzggNTQuMzQxMTcsLTYuNTMzOTEgODEuNTAxNzcsLTkuODM1NTcgcSA0NS42NDgyLC01LjU0MjQzMiA5MS4yOTYzLC0xMS4yNTM0MTMgYyAzMy43NCwtNC4yMDM5MTUgNjcuMzQxLC04LjkyMzQwNiAxMDEuMTAwOCwtMTIuNjMxNTc4IDUyLjA5ODQsLTUuNzEwOTgxIDEwNC4yODYyLC0xMC42Njg0MjkgMTU2LjQyNDMsLTE2LjEwMTc5MyA0NC4yNTg4LC00LjYxMDQyNyA4OC40ODc5LC05LjYyNzM2MyAxMzIuNzY2NiwtMTQuMTE4ODExIDQ1LjU4ODcsLTQuNjMwMjU5IDkxLjE5NzEsLTkuMTgxMTk3IDEzNi44NTUyLC0xMy4xNDcxNTQgMzIuODQ2OCwtMi44NTU0OSA2NS43ODMsLTQuNTcwNzY5IDk4LjY2OTUsLTcuMDM5NTc4IDI3LjkzNDcsLTIuMDgyMTI4IDU1LjgyOTcsLTQuNzI5NDA1IDgzLjc4NDIsLTYuNzIyMjk4IDE5LjczNzksLTEuMzk4MDAxIDM5LjUxNTQsLTIuMjAxMTA5IDU5LjI5MjksLTMuMDUzNzkgMy44NTA0LC0wLjIxODEyNyA3Ljc1MDQsMC42MjQ2MzkgMTIuNjIyOCwxLjEwMDU1NSB6Ij48L3BhdGg+PC9nPjwvc3ZnPg==")`,
                  maskImage: `url("data:image/svg+xml;base64,PHN2ZyBpZD0ic3ZnX19kZXNrdG9wLTBjNDg4M2U4LTE1NTEtNGU4NS1hYWNjLTgwMGJmZmMwZmZkOS1wYW5lIiBkYXRhLW5hbWU9InN2Z19fY29taWMxOTIwcjNtYWluMi0tZGVza3RvcCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTkyMCAxMTIxIiBjbGFzcz0ic3ZnIHN2Z19fY29taWMxOTIwcjNtYWluMiBzdmdfX2NvbWljMTkyMHIzbWFpbjItLWRlc2t0b3AiPjxkZXNjIGlkPSJkZXNjIj5kZWNvcmF0aXZlIGJhY2tncm91bmQ8L2Rlc2M+PGc+PHBhdGggZD0iTSAxOTA0LDE3LjEzNTkzIFYgMTA5MS4wNDgyIGEgMjMuMjkwNDgzLDIzLjI3MDI2MyAwIDAgMSAtNC41MTUyLDEuNTY2NSBjIC0zMS40MDgsNC4wMzU0IC02Mi44MDU5LDcuOTMxOSAtOTQuNTQxNCw4LjU5NjIgLTIyMi4xOTczLDQuMzkyMyAtNDQ0LjQzNDMsMC43MzM4IC02NjYuNjQxNiwxLjk4MyAtMS4zMjk4LDAgLTIuNjQ5NiwwIC0zLjk2OTQsMCAtMTcuNzgyOSwtMC41NjUxIC0yNi4zMTcyLC02LjgyMTUgLTI5Ljk4ODksLTI0LjE2MjYgLTUuNzg1NCwtMjcuMzY1MSAtMTAuODA2NywtNTQuODg4OCAtMTUuOTc2OCwtODIuMzgyODYgLTE0Ljc2NjIsLTc4LjYxNTI0IC0yOS4zMTQxLC0xNTcuMjcwMTEgLTQ0LjIwOTMsLTIzNS44NjU1MSBRIDEwMTkuMDYwOSw2MjguMzM5NzQgOTkzLjU0NzUzLDQ5NS45ODU3OCBjIC0xMi40NDQwNywtNjQuOTcyMzEgLTI1LjA3NjcsLTEyOS44ODUxMyAtMzcuMjYyNzYsLTE5NC45MTY5NSAtNC4xMTgyNiwtMjEuOTcxNDEgLTYuODA3NTQsLTQ0LjIwMDYyIC0xMC42OTc1NCwtNjYuMjExNjcgLTUuMzI4OTQsLTMwLjE1MTIxIC0xMS4zMjI3NCwtNjAuMTczNTIgLTE2LjcxMTIsLTkwLjMwNDg5IGEgOTIuNjQ1OTA5LDkyLjU2NTQ3NiAwIDAgMSAtMC45OTIzNSwtMTguNjEwMjYgMTIuNzAyMDk2LDEyLjY5MTA2OCAwIDAgMSA4LjYyMzUzLC0xMi4xMjU5MiBjIDQuMjc3MDIsLTEuNjA2MjIgOC42OTMsLTMuMzExNTggMTMuMTc4NDIsLTMuODc2NzMgMjcuMTUwNzQsLTMuNDUwMzggNTQuMzQxMTcsLTYuNTMzOTEgODEuNTAxNzcsLTkuODM1NTcgcSA0NS42NDgyLC01LjU0MjQzMiA5MS4yOTYzLC0xMS4yNTM0MTMgYyAzMy43NCwtNC4yMDM5MTUgNjcuMzQxLC04LjkyMzQwNiAxMDEuMTAwOCwtMTIuNjMxNTc4IDUyLjA5ODQsLTUuNzEwOTgxIDEwNC4yODYyLC0xMC42Njg0MjkgMTU2LjQyNDMsLTE2LjEwMTc5MyA0NC4yNTg4LC00LjYxMDQyNyA4OC40ODc5LC05LjYyNzM2MyAxMzIuNzY2NiwtMTQuMTE4ODExIDQ1LjU4ODcsLTQuNjMwMjU5IDkxLjE5NzEsLTkuMTgxMTk3IDEzNi44NTUyLC0xMy4xNDcxNTQgMzIuODQ2OCwtMi44NTU0OSA2NS43ODMsLTQuNTcwNzY5IDk4LjY2OTUsLTcuMDM5NTc4IDI3LjkzNDcsLTIuMDgyMTI4IDU1LjgyOTcsLTQuNzI5NDA1IDgzLjc4NDIsLTYuNzIyMjk4IDE5LjczNzksLTEuMzk4MDAxIDM5LjUxNTQsLTIuMjAxMTA5IDU5LjI5MjksLTMuMDUzNzkgMy44NTA0LC0wLjIxODEyNyA3Ljc1MDQsMC42MjQ2MzkgMTIuNjIyOCwxLjEwMDU1NSB6Ij48L3BhdGg+PC9nPjwvc3ZnPg==")`,
                  maskRepeat: `no-repeat`,
                  WebkitMaskSize: `100% AUTO`,
                  maskSize: `100% AUTO`,
                }
              : {};
          return (
            <div
              key={`${viewportKey}-${payload.id}`}
              className={classNames(
                `w-full h-full`,
                baseClasses[viewportKey],
                classNamesParent
              )}
              style={maskCss}
            ></div>
          );
        }

        default:
          if (shapeName)
            return (
              <div
                key={`${viewportKey}-${payload.id}`}
                className={classNames(
                  baseClasses[viewportKey],
                  classNamesParent
                )}
              >
                <Svg
                  shapeName={shapeName}
                  viewportKey={viewportKey}
                  id={thisId}
                />
              </div>
            );
          return <div key={`${viewportKey}-${payload.id}`} />;
      }
    })
    .filter(n => n);
}
