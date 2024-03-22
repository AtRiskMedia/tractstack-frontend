import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { auth } from "../../store/auth";
import { ProfileCreate } from "./ProfileCreate";
import { ProfileEdit } from "./ProfileEdit";
import { ProfileOpen } from "./ProfileOpen";

export const ProfileSwitch = () => {
  const $authPayload = useStore(auth);
  const [mode, setMode] = useState(`create`);

  useEffect(() => {
    if (mode !== `create`) setMode(`create`);
  }, [$authPayload]);

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
