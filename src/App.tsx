import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen">
      <Outlet />

      <Toaster />
      <ScrollRestoration />
    </div>
  );
};

export default App;
