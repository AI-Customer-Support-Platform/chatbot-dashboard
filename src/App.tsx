import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import Header from "./layout/Header/Header";
import { initLang } from "./utils/i18n";

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const pathname = useLocation().pathname;
  const { t } = useTranslation();

  if (!isLoading && !isAuthenticated && pathname !== "/login") {
    window.location.href = "/login";
  }

  useEffect(() => {
    initLang();
  }, []);

  return (
    <div className="min-h-screen">
      {user && <Header />}
      {isLoading ? <div>{t("Loading...")}</div> : <Outlet />}

      <Toaster />
      <ScrollRestoration />
    </div>
  );
};

export default App;
