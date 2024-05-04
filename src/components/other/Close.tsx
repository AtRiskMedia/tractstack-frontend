import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { storySteps } from "../../store/events";
import type { StoryStep } from "../types";

export const Close = () => {
  const [goto, setGoto] = useState(``);
  const $lastStep = useStore(storySteps);

  useEffect(() => {
    const lastSteps = $lastStep.filter(
      (e: StoryStep) => e.type !== `ContextPane`
    );
    const lastStep = lastSteps.length ? lastSteps.at(-1) : null;
    setGoto(
      lastStep && typeof lastStep.slug === `string` && lastStep.slug.length
        ? lastStep.slug
        : ``
    );
  }, [$lastStep]);

  return (
    <div className="text-center py-4">
      <a
        href={`/${goto}`}
        className="rounded-md bg-myorange/10 hover:bg-black hover:text-white px-3.5 py-1.5 text-black shadow-sm"
      >
        {goto ? <span>Close</span> : <span>Home</span>}
      </a>
    </div>
  );
};
