import type { PaneDatumProps, ContentMap } from "../types";

const Pane = (props: {
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
      <div className="min-h-80 my-80 font-bold bg-yellow-300">
        <p>
          <strong>id:</strong> {props.payload.id}
        </p>
        <p>
          <strong>payload:</strong> {JSON.stringify(props.payload)}
        </p>
      </div>
    );
  return (
    <div className="min-h-80 my-80 font-bold">
      <p>
        <strong>id:</strong> {props.payload.id}
      </p>
      <p>
        <strong>payload:</strong> {JSON.stringify(props.payload)}
      </p>
    </div>
  );
};

export default Pane;
