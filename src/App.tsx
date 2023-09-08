import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration } from "react-router-dom";

import Header from "./layout/Header/Header";
import { initLang } from "./utils/i18n";

const App = () => {
  useEffect(() => {
    initLang();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
      <Toaster />
      <ScrollRestoration />
    </div>
  );
};

export default App;
