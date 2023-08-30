import { useTranslation } from "react-i18next";

import SwitchLangButton from "@/components/buttons/SwitchLangButton";
import { useAuth0 } from "@auth0/auth0-react";

const UserInfo = () => {
  const { user, logout } = useAuth0();
  const { t } = useTranslation();

  return (
    <div className="mb-12 flex items-center justify-between gap-4">
      <section className="flex items-center gap-6">
        <img className="h-16 w-16 rounded-full" src={user?.picture} />
        <div className="flex flex-col">
          <span className="font-bold">{user?.nickname}</span>
          <span className="font-bold">
            {user?.email}
            {!user?.email_verified && (
              <span className="ml-2 font-bold text-red-500">
                (Verification Required)
              </span>
            )}
          </span>
        </div>
      </section>
      <section className="flex flex-col gap-4 sm:flex-row">
        <SwitchLangButton />

        <button
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: import.meta.env.VITE_REDIRECT_URI,
              },
            })
          }
          className="rounded-lg bg-black/70 px-2 py-1 font-bold text-white hover:scale-105 active:scale-110"
        >
          {t("Logout")}
        </button>
      </section>
    </div>
  );
};

export default UserInfo;
