import PaneRender from "../components/PaneRender";
import type { PaneDatumProps } from "../types";

const PaneWrapper = (props: { payload: PaneDatumProps }) => {
  // intercept codehook on panePayload
  const hasCodeHook =
    typeof props?.payload?.optionsPayload?.codeHook?.target === `string`;
  if (hasCodeHook)
    return (
      <div className="bg-yellow-300">
        <p>codehook here {props.payload.optionsPayload.codeHook.target}</p>
      </div>
    );

  // otherwise render as Pane
  return <PaneRender payload={props.payload} />;
};

export default PaneWrapper;
