import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { auth } from "../../store/auth";
import { BoltIcon, BoltSlashIcon } from "@heroicons/react/24/outline";

export const RememberMe = () => {
  const [consent, setConsent] = useState(false);
  const $authPayload = useStore(auth);

  useEffect(() => {
    if ($authPayload.consent === `1`) setConsent(true);
    else if (consent) setConsent(false);
  }, [$authPayload]);

  if (!consent)
    return (
      <a href="/concierge/profile" className="hover:text-myblue hover:rotate-6">
        <BoltSlashIcon className="h-6 w-6 mx-2" title="Remember your Session" />
      </a>
    );
  return (
    <a href="/concierge/profile" className="hover:text-myblue hover:rotate-6">
      <BoltIcon
        className="h-6 w-6 mx-2 text-myblue/80"
        title="Configure your Session"
      />
    </a>
  );
};
