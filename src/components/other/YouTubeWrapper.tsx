import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export const YouTubeWrapper = ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  return <LiteYouTubeEmbed id={id} title={title} />;
};
