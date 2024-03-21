import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { auth } from "../../store/auth";
import { BoltIcon, BoltSlashIcon } from "@heroicons/react/24/outline";

export const RememberMe = () => {
  const [consent, setConsent] = useState(false);
  const $authPayload = useStore(auth);

  function injectPayload() {
    setConsent(true);
    auth.setKey(`consent`, `1`);
  }

  useEffect(() => {
    if ($authPayload.consent === `1`) setConsent(true);
    else if (consent) setConsent(false);
  }, [$authPayload]);

  if (!consent)
    return (
      <button onClick={injectPayload}
    className="hover:text-myblue hover:rotate-6">
        <BoltSlashIcon className="h-6 w-6"
      title="Remember your Session" />
      </button>
    );
  return <BoltIcon className="h-6 w-6 text-myblue/50"
title="You are connected to Tract Stack."
  />;
};
