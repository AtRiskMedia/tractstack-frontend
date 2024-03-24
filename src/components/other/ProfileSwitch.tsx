import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { success, loading, error, auth, profile } from "../../store/auth";
import { ProfileCreate } from "./ProfileCreate";
import { ProfileEdit } from "./ProfileEdit";
import { ProfileOpen } from "./ProfileOpen";

export const ProfileSwitch = () => {
  const $authPayload = useStore(auth);
  const $profile = useStore(profile);
  const [mode, setMode] = useState(`unset`);

  useEffect(() => {
    if (
      $authPayload.consent === `1` &&
      !$profile.hasProfile &&
      mode !== `create`
    ) {
      error.set(undefined);
      success.set(undefined);
      loading.set(undefined);
      setMode(`create`);
    } else if (
      $authPayload.consent === `1` &&
      $profile?.hasProfile &&
      mode !== `open`
    ) {
      error.set(undefined);
      setMode(`open`);
    } else if (mode !== `unset` && $authPayload.consent !== `1`) {
      setMode(`unset`);
      error.set(undefined);
    }
  }, [mode, $profile.hasProfile, $authPayload.consent]);

  if (mode === `unset`) return <div />;
  return (
    <div className="py-6">
      <div className="bg-mywhite border border-dashed border-myblue/20">
        <div className="p-6">
          {mode === `create` ? (
            <ProfileCreate />
          ) : mode === `open` ? (
            <ProfileOpen />
          ) : mode === `edit` ? (
            <ProfileEdit />
          ) : null}
        </div>
      </div>
    </div>
  );
};
