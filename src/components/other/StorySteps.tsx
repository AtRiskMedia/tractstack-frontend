import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { storySteps } from "../../store/events";
import { MapIcon } from "@heroicons/react/24/outline";

export const StorySteps = () => {
  const [hidden, setHidden] = useState(true);
  const $steps = useStore(storySteps);

  useEffect(() => {
    if ($steps.length > 2) setHidden(false);
    else setHidden(true);
  }, [$steps]);
  if (hidden) return <div />;

  return <MapIcon className="h-6 w-6" />;
};
