import { classNames } from "./helpers";
import type { PaneDatumProps, StoryFragmentDatum } from "../types";

export function tailwindWhitelist(
  panes: PaneDatumProps[],
  storyFragments: StoryFragmentDatum[]
) {
  let whitelistString = ``;
  storyFragments.forEach((s: StoryFragmentDatum) => {
    if (s.field_tailwind_background_colour)
      whitelistString = `${whitelistString} ${s.field_tailwind_background_colour} `;
  });
  panes.forEach((pane: PaneDatumProps) => {
    const paneHeightRatioDesktop =
      Number(pane.heightRatioDesktop) === 0
        ? null
        : Math.floor((1920 * Number(pane.heightRatioDesktop)) / 100);
    const paneHeightRatioTablet =
      Number(pane.heightRatioTablet) === 0
        ? null
        : Math.floor((1080 * Number(pane.heightRatioTablet)) / 100);
    const paneHeightRatioMobile =
      Number(pane.heightRatioMobile) === 0
        ? null
        : Math.floor((600 * Number(pane.heightRatioMobile)) / 100);
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
    const paneHeightOffset = classNames(
      pane.heightOffsetMobile
        ? `mt-[calc(var(--scale)*${Math.floor((600 * pane.heightOffsetMobile) / 100)}px)]`
        : ``,
      pane.heightOffsetTablet
        ? `md:mt-[calc(var(--scale)*${Math.floor(
            (1080 * pane.heightOffsetTablet) / 100
          )}px)]`
        : ``,
      pane.heightOffsetDesktop
        ? `xl:mt-[calc(var(--scale)*${Math.floor((1920 * pane.heightOffsetDesktop) / 100)}px)]`
        : ``
    );
    whitelistString = `${whitelistString} ${paneHeightRatio} ${paneHeightOffset}`;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    pane.optionsPayload.paneFragmentsPayload?.forEach((f: any) => {
      const payload = f?.optionsPayload;
      if (payload) {
        const classNames = payload?.classNames;
        const classNamesModal = payload?.classNamesModal;
        const classNamesParent = payload?.classNamesParent;
        const classNamesButtons = payload?.buttons;
        if (classNamesButtons) {
          Object.keys(classNamesButtons).forEach((j: string) => {
            if (
              typeof classNamesButtons[j] === `object` &&
              typeof classNamesButtons[j].className === `string`
            )
              whitelistString = `${whitelistString} ${classNamesButtons[j].className}`;
          });
        }
        const all = [
          { ...classNames },
          { ...classNamesParent },
          { ...classNamesModal },
        ];
        /* eslint-disable @typescript-eslint/no-explicit-any */
        Object.keys(all).forEach((a: any) => {
          if (typeof all[a] !== `undefined`) {
            const payload = typeof all[a] === `object` ? all[a] : null;
            Object.keys(payload).forEach((v: string) => {
              const value = payload[v];
              if (typeof value === `string`)
                whitelistString = `${whitelistString} ${value}`;
              if (typeof value === `object`) {
                Object.keys(value).forEach((s: string) => {
                  if (typeof value[s] === `string`)
                    whitelistString = `${whitelistString} ${value[s]}`;
                  if (typeof value[s] === `object`) {
                    Object.keys(value[s]).forEach((t: string) => {
                      if (typeof value[s][t] === `string`)
                        whitelistString = `${whitelistString} ${value[s][t]}`;
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  });
  const whitelistArray = whitelistString.split(` `);
  const whitelistArrayUnique = whitelistArray
    .filter((item, index) => whitelistArray.indexOf(item) === index)
    .filter(e => e);
  return whitelistArrayUnique;
}
