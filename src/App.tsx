import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Header from "./layout/Header/Header";
import { initLang } from "./utils/i18n";
import Correction from "./pages/Config/Correction/Correction";

const App = () => {
  useEffect(() => {
    initLang();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col p-4 sm:p-8">
        <Correction />
      </main>
      <Toaster />
    </div>
  );
};

export default App;
