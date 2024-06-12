import { useRef, useEffect } from "react";

export const BunnyVideo = ({
  videoUrl,
  title,
  autoplay,
}: {
  videoUrl: string;
  title: string;
  autoplay: string;
}) => {
  const regex = /^(\d+)s$/;
  const match = autoplay?.match(regex);
  const startTime = (match && parseInt(match[1])) || 0;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
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
  }, [startTime, iframeRef]);

  return (
    <div className="relative aspect-video">
      <iframe
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
