import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { XMarkIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { panesVisible, showImpressions } from "../store/events";
import { useInterval } from "../utils/useInterval";
import { Impression } from "./Impression";
import type { ImpressionDatum } from "../types";

const ImpressionWrapper = ({ payload }: { payload: ImpressionDatum[] }) => {
  const $inView = useStore(panesVisible);
  const $show = useStore(showImpressions);
  const [offset, setOffset] = useState(0);
  const [activeImpressions, setActiveImpressions] = useState<ImpressionDatum[]>(
    []
  );
  const [currentImpression, setCurrentImpression] = useState<
    ImpressionDatum | undefined
  >(undefined);

  useInterval(
    () => {
      if (activeImpressions.length > offset + 1) {
        setCurrentImpression(activeImpressions[offset]);
        setOffset(offset + 1);
      } else {
        setCurrentImpression(activeImpressions[0]);
        setOffset(0);
      }
    },
    import.meta.env.PUBLIC_IMPRESSIONS_DELAY || 22000
  );

  useEffect(() => {
    // these are the panes to watch for from inView
    const panesWatch = payload.map((p: ImpressionDatum) => p.parentId);
    const start = activeImpressions ? Object.keys(activeImpressions).length : 0;
    const alreadyActive = activeImpressions
      ? Object.keys(activeImpressions)
      : [];
    Object.keys($inView).forEach((s: string) => {
      if (!alreadyActive.includes(s) && panesWatch.includes(s))
        alreadyActive.push(s);
    });
    if (alreadyActive.length > start) {
      setActiveImpressions(
        payload.filter((i: ImpressionDatum) =>
          alreadyActive?.includes(i.parentId)
        )
      );
      if (offset === 0) {
        setCurrentImpression(
          payload
            .filter((i: ImpressionDatum) => alreadyActive?.includes(i.parentId))
            .at(0)
        );
      }
    }
  }, [$inView]);

  if (!currentImpression) return <aside />;
  if (!$show)
    return (
      <aside className="mr-1 fixed bottom-[1vh] right-[1vh] w-auto h-auto z-70">
        <button
          type="button"
          className="rounded-md bg-mylightgrey/50 hover:bg-myorange/50 text-black focus:outline-none focus:ring-2 focus:ring-mygreen focus:ring-offset-2"
          onClick={() => showImpressions.set(!$show)}
        >
          <span className="sr-only">Show impressions</span>
          <ArrowsPointingOutIcon className="h-8 w-8" aria-hidden="true" />
          <span className="absolute -top-5 -left-4 h-6 w-6 rounded-full bg-myorange/20 text-black flex justify-center items-center items">
            {activeImpressions.length}
          </span>
        </button>
      </aside>
    );
  else
    return (
      <aside className="mr-1 fixed bottom-[1vh] right-[1vh] w-auto h-auto z-70 h-[calc(--scale)*152px] w-[calc(--scale)*540px] max-h-[152px] max-w-[540px] md:h-[135px] md:w-[480px] overflow-hidden bg-white rounded-md border border-mydarkgrey">
        <button
          type="button"
          className="z-90101 absolute right-2 top-2 rounded-md bg-white text-mylightgrey hover:text-mylightgrey focus:outline-none focus:ring-2 focus:ring-mygreen focus:ring-offset-2"
          onClick={() => showImpressions.set(!$show)}
        >
          <span className="sr-only">Hide impressions</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <Impression payload={currentImpression} />
      </aside>
    );
};

export default ImpressionWrapper;
