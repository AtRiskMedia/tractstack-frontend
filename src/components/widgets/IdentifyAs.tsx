import { useMemo } from "react";
import { heldBeliefsScales } from "@assets/beliefs";
import { classNames } from "../../utils/helpers";
import { heldBeliefs } from "../../store/beliefs";

const IdentifyAs = ({ value, cssClasses = ``, storyFragmentId }: any) => {
  const identifyAsSlug = value.slug;
  const identifyAsObject = value.target;
  const thisTitle = `Tell me more!`;
  const extra = value && typeof value.extra === `string` ? value.extra : null;
  const thisScale = heldBeliefsScales.agreement;
  const selected = useMemo(() => {
    //const hasMatchingBelief = beliefs[value.slug];
    //if (
    //  typeof hasMatchingBelief === `string` &&
    //  hasMatchingBelief === identifyAsObject
    //)
    //  return thisScale.filter((e: any) => e.slug === `AGREES`)[0];
    return { id: 0, slug: `0`, name: `0`, color: `` };
  }, [thisScale, identifyAsObject, value.slug]);

  const handleClick = () => {
    //if (identifyAsObject && identifyAsSlug) {
    //  updateBeliefs(identifyAsSlug, identifyAsObject.toUpperCase());
    //  pushEvent(
    //    {
    //      verb: `IDENTIFY_AS`,
    //      id: identifyAsSlug,
    //      title: identifyAsSlug,
    //      object: identifyAsObject.toUpperCase(),
    //      type: `Belief`,
    //    },
    //    storyFragmentId
    //  );
    //}
  };

  return (
    <div className={cssClasses}>
      {extra ? <span className="mr-2">{extra}</span> : null}
      <div className="block mt-3 w-fit">
        <button
          type="button"
          onClick={handleClick}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <div className="flex items-center">
            <span
              aria-label="Color swatch for belief"
              className={classNames(
                `motion-safe:animate-pulse`,
                selected && selected?.color ? selected.color : `bg-myorange`,
                `inline-block h-2 w-2 flex-shrink-0 rounded-full`
              )}
            />
            <span className="ml-3 block truncate">{thisTitle}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default IdentifyAs;
