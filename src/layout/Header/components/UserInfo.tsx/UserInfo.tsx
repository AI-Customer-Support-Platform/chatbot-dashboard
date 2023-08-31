import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useAuth0 } from "@auth0/auth0-react";

const UserInfo = () => {
  const { user } = useAuth0();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="relative" onClick={() => setShowModal(true)}>
        <img className="h-7 w-7 rounded-full" src={user?.picture} />
      </button>

      {showModal && <UserInfoModal setShowModal={setShowModal} />}
    </>
  );
};

interface UserInfoModalProps {
  setShowModal: (showModal: boolean) => void;
}

const UserInfoModal = ({ setShowModal }: UserInfoModalProps) => {
  const { user, logout } = useAuth0();
  const { t } = useTranslation();
  return (
    <>
      <div
        onClick={() => setShowModal(false)}
        className="fixed inset-0 z-20 h-screen w-full bg-transparent"
      ></div>
      <section className="absolute right-4 top-12 z-20 flex flex-col  gap-4 rounded-xl border bg-white bg-white/80 py-4  backdrop-blur">
        <span className="border-b px-4 pb-2">{user?.email}</span>

        <button
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: import.meta.env.VITE_REDIRECT_URI,
              },
            })
          }
          className="w-full px-4 py-2 text-start text-lg text-slate-700 hover:bg-slate-100"
        >
          {t("Logout")}
        </button>
      </section>
    </>
  );
};

export default UserInfo;
