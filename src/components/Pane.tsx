import PaneRender from "@components/PaneRender";
import PaneFilter from "@components/PaneFilter";
import CodeHook from "../custom/codehooks";
import type { PaneDatumProps } from "../types";

const Pane = (props: { payload: PaneDatumProps }) => {
  // intercept any held or withheld beliefs
  const filterBeliefs =
    typeof props?.payload?.optionsPayload?.heldBeliefs === `object` ||
    typeof props?.payload?.optionsPayload?.withheldBeliefs === `object`;

  // intercept codehook on panePayload
  const hasCodeHook =
    typeof props?.payload?.optionsPayload?.codeHook?.target === `string`;
  if (hasCodeHook && filterBeliefs) {
    return (
      <PaneFilter
        heldBeliefsFilter={props?.payload?.optionsPayload?.heldBeliefs}
        withheldBeliefsFilter={props?.payload?.optionsPayload?.withheldBeliefs}
      >
        <div className="bg-yellow-300">
          <p>codehook here {props.payload.optionsPayload.codeHook.target}</p>
        </div>
      </PaneFilter>
    );
  } else if (hasCodeHook) {
    const target = props.payload.optionsPayload.codeHook.target;
    if (target) return <CodeHook target={target} />;
    else return <div />;
  }

  // else render as Pane
  if (filterBeliefs) {
    return (
      <PaneFilter
        heldBeliefsFilter={props?.payload?.optionsPayload?.heldBeliefs}
        withheldBeliefsFilter={props?.payload?.optionsPayload?.withheldBeliefs}
      >
        <PaneRender payload={props.payload} />
      </PaneFilter>
    );
  }

  return <PaneRender payload={props.payload} />;
};

export default Pane;
