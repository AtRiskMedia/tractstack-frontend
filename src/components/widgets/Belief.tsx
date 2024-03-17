import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { heldBeliefsScales, heldBeliefsTitles } from "@assets/beliefs";
import { classNames } from "../../utils/helpers";
import { heldBeliefs } from "../../store/beliefs";
import { events } from "../../store/events";
import type { BeliefOptionDatum, BeliefDatum } from "../../types";

// whitelist: bg-teal-400 bg-lime-400 bg-slate-200 bg-amber-400 bg-red-400 bg-lime-400 bg-amber-400 bg-lime-400 bg-amber-400 bg-lime-400 bg-amber-400 bg-lime-400 bg-amber-400

const Belief = ({
  value,
}: {
  value: { slug: string; scale: string; extra: string };
}) => {
  const heldBeliefsAll = heldBeliefs.get();
  const thisScaleLookup = value.scale as keyof typeof heldBeliefsScales;
  const extra = value && typeof value.extra === `string` ? value.extra : null;
  const thisTitle = heldBeliefsTitles[thisScaleLookup];
  const thisScaleRaw = heldBeliefsScales[thisScaleLookup].sort(function (
    a: BeliefOptionDatum,
    b: BeliefOptionDatum
  ) {
    return b.id - a.id;
  });
  const start = {
      id: 0,
      slug: "0",
      name: thisTitle,
      color: `bg-myorange`,
    }
  const thisScale = [
    start,
        ...thisScaleRaw,
  ];
  const [selected, setSelected] = useState(start);

  useEffect(() => {
    const hasMatchingBelief = heldBeliefsAll
      .filter((e: BeliefDatum) => e.slug === value.slug)
      .at(0);
    const knownOffset =
      typeof hasMatchingBelief?.verb === `string`
        ? thisScale
            .filter((e: BeliefOptionDatum) => e.slug === hasMatchingBelief.verb)
            .at(0)
        : false;
    if (knownOffset && knownOffset?.slug) setSelected(knownOffset);
  }, [heldBeliefsAll]);

  const handleClick = (e: BeliefOptionDatum) => {
    const event = {
      verb: e.slug,
      id: value.slug,
      title: value.slug,
      type: `Belief`,
    };
    const belief = {
      id: value.slug,
      slug: value.slug,
      verb: e.slug,
    };
    heldBeliefs.set([...heldBeliefs.get(), belief]);
    events.set([...events.get(), event]);
  };

  return (
    <>
      {extra ? <span className="mr-2">{extra}</span> : null}
      <div className="block mt-3 w-fit">
        <Listbox value={selected} onChange={handleClick}>
          {({ open }) => (
            <>
              <div className="z-90 relative mt-1">
                <Listbox.Button
                  className={classNames(
                    selected?.color
                      ? `border-${selected.color.substring(3)}`
                      : `bg-slate-200`,
                    `relative w-full cursor-default rounded-md border bg-white text-black py-2 pl-3 pr-10 text-left shadow-sm focus:border-myorange focus:outline-none focus:ring-1 focus:ring-myorange sm:text-sm`
                  )}
                >
                  <span className="flex items-center">
                    <span
                      aria-label="Color swatch for belief"
                      className={classNames(
                        `motion-safe:animate-pulse`,
                        selected?.color ? selected.color : `bg-myorange`,
                        `inline-block h-2 w-2 flex-shrink-0 rounded-full`
                      )}
                    />
                    <span className="ml-3 block truncate">
                      {selected?.name || thisTitle}
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-mylightgrey"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {thisScale.map((factor: BeliefOptionDatum) => (
                      <Listbox.Option
                        key={factor.id}
                        className={({ active }) =>
                          classNames(
                            active ? `text-myblue bg-slate-200` : `text-black`,
                            `relative cursor-default select-none py-2 pl-3 pr-9`
                          )
                        }
                        value={factor}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span
                                className={classNames(
                                  factor.color,
                                  `inline-block h-2 w-2 flex-shrink-0 rounded-full`
                                )}
                                aria-hidden="true"
                              />
                              <span
                                className={classNames(
                                  selected ? `underline` : ``,
                                  `ml-3 block truncate`
                                )}
                              >
                                {factor.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? `text-white` : `text-black`,
                                  `absolute inset-y-0 right-0 flex items-center px-2`
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </>
  );
};

export default Belief;
