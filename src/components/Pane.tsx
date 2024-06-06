import PaneRender from "@components/PaneRender";
import PaneFilter from "@components/PaneFilter";
import CodeHook from "../custom/codehooks";
import type { PaneDatumProps, ResourceDatum } from "../types";

const Pane = (props: {
  payload: PaneDatumProps;
  resourcePayload: ResourceDatum[];
}) => {
  // intercept any held or withheld beliefs
  const filterBeliefs =
    typeof props?.payload?.optionsPayload?.heldBeliefs === `object` ||
    typeof props?.payload?.optionsPayload?.withheldBeliefs === `object`;

  // intercept codehook on panePayload
  const hasCodeHook =
    typeof props?.payload?.optionsPayload?.codeHook?.target === `string`;
  if (hasCodeHook) {
    const target = props.payload.optionsPayload.codeHook.target;
    if (filterBeliefs && target)
      return (
        <PaneFilter
          heldBeliefsFilter={props?.payload?.optionsPayload?.heldBeliefs}
          withheldBeliefsFilter={
            props?.payload?.optionsPayload?.withheldBeliefs
          }
        >
          <div id={props.payload.slug}>
            <CodeHook target={target} payload={props?.resourcePayload || []} />
          </div>
        </PaneFilter>
      );
    if (target)
      return (
        <div id={props.payload.slug}>
          <CodeHook target={target} payload={props?.resourcePayload || []} />
        </div>
      );
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
