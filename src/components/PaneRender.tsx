import { classNames } from "../utils/helpers";
import { PaneCompositor } from "./PaneCompositor";
import type {
  PaneRenderProps,
  BgColourDatum,
  BgPaneDatum,
  MarkdownPaneDatum,
} from "../types";

// returns a Rendered Pane as a div
export default function PaneRender({ payload }: PaneRenderProps) {
  // - if paneHeightRatio[Desktop|Tablet|Mobile], calculate height and inject
  const paneHeightRatioDesktop =
    Number(payload.heightRatioDesktop) == 0
      ? null
      : Math.floor((1920 * Number(payload.heightRatioDesktop)) / 100);
  const paneHeightRatioTablet =
    Number(payload.heightRatioTablet) == 0
      ? null
      : Math.floor((1080 * Number(payload.heightRatioTablet)) / 100);
  const paneHeightRatioMobile =
    Number(payload.heightRatioMobile) == 0
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
  const paneHeight: [number, number, number] = [
    Math.floor((600 * Number(payload.heightRatioMobile)) / 100),
    Math.floor((1080 * Number(payload.heightRatioTablet)) / 100),
    Math.floor((1920 * Number(payload.heightRatioDesktop)) / 100),
  ];

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

  // - if bgColour, set on parent div
  const bgColourPane = payload.optionsPayload.paneFragmentsPayload
    .filter(
      (a: BgColourDatum | BgPaneDatum | MarkdownPaneDatum) =>
        a.internal.type === `bgColour`
    )
    .at(0) as BgColourDatum;
  const bgColour = bgColourPane?.bgColour;
  const bgColourStyle = bgColour ? { backgroundColor: bgColour } : {};

  // - run compositor on all paneFragments to generate child
  const paneFragmentStyle = {
    gridArea: "1/1/1/1",
  };
  const paneFragments = payload.optionsPayload.paneFragmentsPayload.filter(
    (a: BgColourDatum | BgPaneDatum | MarkdownPaneDatum) =>
      a.internal.type !== `bgColour`
  ) as BgPaneDatum[] | MarkdownPaneDatum[];

  return (
    <div
      id={payload.slug}
      style={bgColourStyle}
      className={classNames(
        paneHeightRatio,
        paneHeightOffset,
        `grid h-fit-contents`
      )}
    >
      {paneFragments
        .sort(
          (
            a: BgPaneDatum | MarkdownPaneDatum,
            b: BgPaneDatum | MarkdownPaneDatum
          ) =>
            (a.internal.type === `markdown` ? 1 : 0) -
            (b.internal.type === `markdown` ? 1 : 0)
        )
        .map((f: BgPaneDatum | MarkdownPaneDatum) => (
          <div
            className="relative w-full h-full justify-self-start"
            style={paneFragmentStyle}
            key={f.id}
          >
            <PaneCompositor
              payload={f}
              markdown={payload.markdown}
              files={payload.files}
              paneHeight={paneHeight}
            />
          </div>
        ))}
    </div>
  );
}
