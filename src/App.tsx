import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useInjectChatbot from "./hooks/useInjectChatbot";
import { useEffect } from "react";
import { initLang } from "./utils/i18n";
import { useTranslation } from "react-i18next";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const pathname = useLocation().pathname;
  useInjectChatbot();
  const { t } = useTranslation();

  if (!isLoading && !isAuthenticated && pathname !== "/login") {
    window.location.href = "/login";
  }

  useEffect(() => {
    initLang();
  }, []);

  return (
    <div className="min-h-screen">
      {isLoading ? <div>{t("Loading...")}</div> : <Outlet />}

      <Toaster />
      <ScrollRestoration />
    </div>
  );
};

export default App;
