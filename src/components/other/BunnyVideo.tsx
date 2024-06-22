import { useRef, useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { storyFragmentBunnyWatch, contextBunnyWatch } from "../../store/events";

export const BunnyVideo = ({
  videoUrl,
  title,
  autoplay,
  slug,
}: {
  videoUrl: string;
  title: string;
  autoplay: string;
  slug: string;
}) => {
  const regex = /^(\d+)s$/;
  const match = autoplay?.match(regex);
  const [startTime, setStartTime] = useState<number>(
    (match && parseInt(match[1])) || 0
  );
  const $storyFragmentBunnyWatch = useStore(storyFragmentBunnyWatch);
  const $contextBunnyWatch = useStore(contextBunnyWatch);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if ($storyFragmentBunnyWatch?.slug === slug)
    {
      setStartTime($storyFragmentBunnyWatch.t);
      storyFragmentBunnyWatch.set(null)
    }
    else if ($contextBunnyWatch?.slug === slug)
    {
      setStartTime($contextBunnyWatch.t);
      contextBunnyWatch.set(null)
    }
    if (startTime && iframeRef.current) {
      iframeRef.current.onload = () => {
        setTimeout(() => {
          if (iframeRef.current && iframeRef.current.contentDocument) {
            // iframe is loaded, now play the video (if autoplay)
            const video =
              iframeRef.current.contentDocument.querySelector("video");
            if (video) {
              video.play();
            }
          }
        }, 100); // wait for 100ms to ensure the iframe is fully loaded
      };
    }
  }, [
    startTime,
    iframeRef,
    slug,
    $storyFragmentBunnyWatch,
    $contextBunnyWatch,
  ]);

  return (
    <div className="relative aspect-video">
      <iframe
        id="bunny"
        ref={iframeRef}
        src={`${videoUrl}?autoplay=${startTime > 0}&loop=false&muted=false&preload=${startTime > 0}&responsive=true&t=${startTime}`}
        title={title}
        loading="lazy"
        className="border-none absolute top-0 h-full w-full"
        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
        allowFullScreen
      ></iframe>
    </div>
  );
};
