import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { useStore } from "@nanostores/react";
import { classNames } from "../../utils/helpers";
import { auth } from "../../store/auth";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export const RememberMeToggle = () => {
  const [consent, setConsent] = useState(false);
  const $authPayload = useStore(auth);

  function toggleConsent() {
    auth.setKey(`consent`, consent ? `0` : `1`);
    if (consent) {
      auth.setKey(`firstname`, undefined);
      auth.setKey(`encryptedCode`, undefined);
      auth.setKey(`encryptedEmail`, undefined);
    }
    setConsent(!consent);
  }

  useEffect(() => {
    if ($authPayload.consent === `1`) setConsent(true);
  }, [$authPayload]);

  return (
    <Switch.Group as="div" className={classNames(`flex items-center my-12`)}>
      <Switch
        checked={consent}
        onChange={() => toggleConsent()}
        className={classNames(
          consent ? `bg-myorange` : `bg-slate-200`,
          `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-myorange focus:ring-offset-2`
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            consent ? `translate-x-5` : `translate-x-0`,
            `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-lg">
        <div className="flex flex-nowrap">
          <span className={consent ? `text-myorange` : `text-mydarkgrey`}>
            {consent ? `Memory activated!` : `Activate memory`}
          </span>
          <span
            className="ml-2"
            title="We will use a few kilobytes of localStorage in your browser."
          >
            <InformationCircleIcon className="w-5 h-5 text-mydarkgrey/50" />
          </span>
        </div>
      </Switch.Label>
    </Switch.Group>
  );
};
