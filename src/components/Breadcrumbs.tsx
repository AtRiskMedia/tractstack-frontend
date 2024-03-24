import { useEffect, useState } from "react";
import { storySteps } from "../store/events";
import { useStore } from "@nanostores/react";
import type { StoryStep } from "../types";

export const Breadcrumbs = () => {
  const [show, setShow] = useState(false);
  const $storySteps = useStore(storySteps);
  const home = import.meta.env.PUBLIC_HOME;

  useEffect(() => {
    if ($storySteps.length && !show) setShow(true);
  }, [$storySteps]);

  if (!show)
    return (
      <ul className="max-w-md mx-auto space-y-6 py-16">
        <li>You've just arrived!</li>
      </ul>
    );

  return (
    <ul className="max-w-md mx-auto space-y-6 py-16">
      {$storySteps.map((s: StoryStep, idx: number) => (
        <li key={`${idx}-${s.slug}`}>
          <a
            href={
              s.type === `ContextPane`
                ? `/context/${s.slug}`
                : s.slug === home
                  ? `/`
                  : s.slug
            }
            className="text-myblue font-action hover:text-black hover:underline"
          >
            {s.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
