import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import svgLogo from "@/assets/imgs/svgs/logo.svg";
import SwitchLangButton from "@/components/buttons/SwitchLangButton";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { user, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const handleClickLogin = () => {
    loginWithRedirect();
  };
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      {!user && (
        <main className="h-screen bg-[#f8f9fa] bg-gradient-to-b from-white to-slate-200">
          <section className="absolute right-4 top-4">
            <SwitchLangButton />
          </section>
          <section className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-10 sm:flex-row">
              <img className="w-64" src={svgLogo} />
              <button
                onClick={handleClickLogin}
                className="rounded bg-red-500/80 px-4 py-2 text-lg font-bold text-white hover:scale-105 hover:bg-red-500/90 active:scale-110 "
              >
                {t("Login")}
              </button>
            </div>
          </section>
        </main>
      )}
    </>
  );
};
export default Login;
