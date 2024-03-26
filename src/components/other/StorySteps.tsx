import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { sync } from "../../store/auth";
import { MapIcon } from "@heroicons/react/24/outline";

export const StorySteps = () => {
  const [hidden, setHidden] = useState(true);
  const $sync = useStore(sync);

  useEffect(() => {
    if ($sync) setHidden(false);
    else setHidden(true);
  }, [$sync]);
  if (hidden) return <div />;

  return <MapIcon className="h-6 w-6 mx-2" />;
};
