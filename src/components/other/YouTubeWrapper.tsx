import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export const YouTubeWrapper = ({
  id,
  title,
  autoplay,
}: {
  id: string;
  title: string;
  autoplay: string;
}) => {
  const regex = /^(\d+)s$/;
  const match = autoplay?.match(regex);
  const offset = (match && parseInt(match[1])) || 0;
  if (offset) console.log(`offset`, offset);
  return <LiteYouTubeEmbed id={id} title={title} />;
};
