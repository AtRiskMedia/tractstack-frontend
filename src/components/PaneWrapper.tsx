import type { PaneDatumProps, ContentMap } from "../types";
import PaneRender from "../components/PaneRender";

const PaneWrapper = (props: {
  payload: PaneDatumProps;
  current: ContentMap;
  contentMap: ContentMap[];
}) => {
  // must pass payload through @tractstack/helpers Compositor
  // - what needs to be passed?
  // -- onClick handler intercept fn to process events on a href
  // -- inline "resource", YouTube, Belief, IdentifyAs, Toggle -- pass templating fn, returns Jsx
  //
  // - what needs to be intercepted?
  // -- codehook
  //

  const hasCodeHook =
    typeof props?.payload?.optionsPayload?.codeHook?.target === `string`;
  if (hasCodeHook)
    return (
      <div className="bg-yellow-300">
        <p>codehook here {props.payload.optionsPayload.codeHook.target}</p>
      </div>
    );

  return <PaneRender payload={props.payload} />;
};

export default PaneWrapper;
