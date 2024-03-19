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
  const [overrideWithhold, setOverrideWithhold] = useState(false);

  useEffect(() => {
    // must match for all heldBeliefs
    // - setReveal true on match
    if (heldBeliefsFilter && Object.keys(heldBeliefsFilter)?.length) {
      let match = false;
      Object.entries(heldBeliefsFilter).forEach(([key, value]) => {
        if (typeof value === `string`) {
          const thisMatchingBelief = $heldBeliefsAll
            .filter(
              (m: BeliefStore) =>
                m.slug === key && (m.verb === value || m.verb === `*`)
            )
            .at(0);
          if (thisMatchingBelief) match = true;
        } else {
          Object.values(value).forEach(v => {
            const thisMatchingBelief = $heldBeliefsAll
              .filter((m: BeliefStore) => m.slug === key && m.verb === v)
              .at(0);
            if (thisMatchingBelief) match = true;
          });
        }
      });
      if (match) setReveal(true);
      else setReveal(false);
    } else setReveal(true);

    // must match for all withheldBeliefs
    // - setWithhold false on match
    if (withheldBeliefsFilter && Object.keys(withheldBeliefsFilter)?.length) {
      let override = false;
      Object.entries(withheldBeliefsFilter).forEach(([key, value]) => {
        if (typeof value === `string`) {
          const thisMatchingBelief = $heldBeliefsAll
            .filter(
              (m: BeliefStore) =>
                m.slug === key && (m.verb === value || m.verb === `*`)
            )
            .at(0);
          if (thisMatchingBelief) override = true;
        } else {
          Object.values(value).forEach(v => {
            const thisMatchingBelief = $heldBeliefsAll
              .filter((m: BeliefStore) => m.slug === key && m.verb === v)
              .at(0);
            if (thisMatchingBelief) override = true;
          });
        }
      });
      if (override) setOverrideWithhold(true);
      else setOverrideWithhold(false);
    } else setOverrideWithhold(true);
  }, [$heldBeliefsAll, heldBeliefsFilter, withheldBeliefsFilter]);

  if (reveal && overrideWithhold) return props.children;
  return <div />;
};

export default PaneFilter;
