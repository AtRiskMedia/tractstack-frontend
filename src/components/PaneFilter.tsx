import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { heldBeliefs } from "../store/beliefs";
import type { BeliefStore, BeliefDatum } from "../types";

const PaneFilter = (props: {
  heldBeliefsFilter: BeliefDatum[];
  withheldBeliefsFilter: BeliefDatum[];
  children: JSX.Element;
}) => {
  const { heldBeliefsFilter, withheldBeliefsFilter } = props;
  const $heldBeliefsAll = useStore(heldBeliefs);

  const [reveal, setReveal] = useState(false);
  const [hasReveal, setHasReveal] = useState(false);
  const [overrideWithhold, setOverrideWithhold] = useState(false);

  useEffect(() => {
    // must match for all heldBeliefs
    // - setReveal true on match
    if (heldBeliefsFilter && Object.keys(heldBeliefsFilter)?.length) {
      let match = false;
      let all = true;
      Object.entries(heldBeliefsFilter).forEach(([key, value]) => {
        if (typeof value === `string`) {
          const thisMatchingBelief = $heldBeliefsAll
            .filter(
              (m: BeliefStore) =>
                m.slug === key &&
                (m.verb === value || m.verb === `*` || m?.object === value)
            )
            .at(0);
          if (thisMatchingBelief) match = true;
          else all = false;
        } else {
          Object.values(value).forEach(v => {
            const thisMatchingBelief = $heldBeliefsAll
              .filter(
                (m: BeliefStore) =>
                  (m.slug === key && m.verb === v) ||
                  (m.slug === key && m?.object === v)
              )
              .at(0);
            if (thisMatchingBelief) match = true;
            else all = false;
          });
        }
      });
      if (match && all) {
        if (!hasReveal) setHasReveal(true);
        setReveal(true);
      } else setReveal(false);
    } else setReveal(true);

    // must match for all withheldBeliefs
    // - setWithhold false on match
    if (withheldBeliefsFilter && Object.keys(withheldBeliefsFilter)?.length) {
      let withhold = true;
      Object.entries(withheldBeliefsFilter).forEach(([key, value]) => {
        if (typeof value === `string`) {
          const thisMatchingBelief = $heldBeliefsAll
            .filter(
              (m: BeliefStore) =>
                m.slug === key &&
                (m.verb === value || m.verb === `*` || m?.object === value)
            )
            .at(0);
          if (thisMatchingBelief) withhold = false;
        } else {
          Object.values(value).forEach(v => {
            const thisMatchingBelief = $heldBeliefsAll
              .filter(
                (m: BeliefStore) =>
                  (m.slug === key && m.verb === v) ||
                  (m.slug === key && m?.object === v)
              )
              .at(0);
            if (thisMatchingBelief) withhold = false;
          });
        }
      });
      if (withhold) setOverrideWithhold(true);
      else setOverrideWithhold(false);
    } else setOverrideWithhold(true);
  }, [$heldBeliefsAll, heldBeliefsFilter, withheldBeliefsFilter]);

  if (hasReveal && reveal && overrideWithhold)
    return <div className="motion-safe:animate-fadeInUp">{props.children}</div>;
  if (reveal && overrideWithhold) return props.children;
  return <div className="invisible h-0">{props.children}</div>;
};

export default PaneFilter;
