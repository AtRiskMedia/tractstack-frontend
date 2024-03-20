import { lispLexer } from "../utils/concierge/lispLexar";
import { preParseAction } from "../utils/concierge/preParseAction";
import { events } from "../store/events";
import type { ImpressionDatum } from "../types";

export const Impression = ({ payload }: { payload: ImpressionDatum }) => {
  const thisButtonPayload = lispLexer(payload.actionsLisp);
  const actionPayload = preParseAction(thisButtonPayload);

  function injectPayload() {
    const event = {
      id: payload.id,
      title: payload.title,
      type: `Impression`,
      verb: `CLICKED`,
      targetId: payload.parentId,
    };
    events.set([...events.get(), event]);
  }

  if (typeof payload !== `object`) return <div className="hidden" />;
  return (
    <div className="p-3">
      <h3 className="text-md font-action leading-6 text-black">
        {payload.title}
      </h3>
      <div className="mt-2 sm:flex sm:items-start sm:justify-between">
        <div className="max-w-xl text-sm text-black">
          <p>
            {payload.body}
            {` `}
            <a
              onClick={injectPayload}
              className="underline underline-offset-4 text-black hover:text-myorange"
              href={actionPayload}
            >
              {payload.buttonText}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
