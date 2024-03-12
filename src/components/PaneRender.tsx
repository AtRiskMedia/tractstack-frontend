import { classNames } from "@tractstack/helpers";
import type { PaneRenderProps } from "../types";
import { compositor } from "../utils/compositor";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default function PaneRender({ payload }: PaneRenderProps) {
  //console.log(``)
  //console.log(`payload:`)

  // this will return a Rendered Pane as a div
  //
  // things to do:
  // - if paneHeightRatio[Desktop|Tablet|Mobile], calculate height and inject
  const paneHeightRatioDesktop =
    Number(payload.heightRatioDesktop) === 0
      ? null
      : Math.floor((1920 * Number(payload.heightRatioDesktop)) / 100);
  const paneHeightRatioTablet =
    Number(payload.heightRatioTablet) === 0
      ? null
      : Math.floor((1080 * Number(payload.heightRatioTablet)) / 100);
  const paneHeightRatioMobile =
    Number(payload.heightRatioMobile) === 0
      ? null
      : Math.floor((600 * Number(payload.heightRatioMobile)) / 100);
  const paneHeightRatio = classNames(
    paneHeightRatioMobile
      ? `h-[calc(var(--scale)*${paneHeightRatioMobile}px)]`
      : ``,
    paneHeightRatioTablet
      ? `md:h-[calc(var(--scale)*${paneHeightRatioTablet}px)]`
      : ``,
    paneHeightRatioDesktop
      ? `xl:h-[calc(var(--scale)*${paneHeightRatioDesktop}px)]`
      : ``
  );

  // - if paneOffset[Desktop|Tablet|Mobile], calculate margin and inject
  const paneHeightOffset = classNames(
    payload.heightOffsetMobile
      ? `mt-[calc(var(--scale)*${Math.floor((600 * payload.heightOffsetMobile) / 100)}px)]`
      : ``,
    payload.heightOffsetTablet
      ? `md:mt-[calc(var(--scale)*${Math.floor(
          (1080 * payload.heightOffsetTablet) / 100
        )}px)]`
      : ``,
    payload.heightOffsetDesktop
      ? `xl:mt-[calc(var(--scale)*${Math.floor((1920 * payload.heightOffsetDesktop) / 100)}px)]`
      : ``
  );

  // - run compositor on all paneFragments to generate child
  const paneFragmentStyle = {
    gridArea: "1/1/1/1",
  };
  const bgColour = payload.optionsPayload.paneFragmentsPayload
    .filter((a: any) => a.internal.type === `bgColour`)
    .at(0).bgColour;
  const bgColourStyle = bgColour ? { backgroundColor: bgColour } : {};
  const styles = { ...paneFragmentStyle, ...bgColourStyle };
  const children = payload.optionsPayload.paneFragmentsPayload
    .filter((a: any) => a.internal.type !== `bgColour`)
    .sort((a: any, b: any) => (a?.field_zindex || 0) - (b?.field_zindex || 0))
    .map((f: any) => {
      const child = compositor(f, payload.markdown);
      return (
        <div
          className="relative w-full h-full justify-self-start"
          style={styles}
          key={f.id}
        >
          {child}
        </div>
      );
    });

  return (
    <div
      className={classNames(
        paneHeightRatio,
        paneHeightOffset,
        `grid h-fit-contents`
      )}
    >
      {children}
    </div>
  );
}
