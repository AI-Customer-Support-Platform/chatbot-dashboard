import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useInjectChatbot from "./hooks/useInjectChatbot";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const pathname = useLocation().pathname;
  useInjectChatbot();

  if (!isLoading && !isAuthenticated && pathname !== "/login") {
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen">
      {isLoading ? <div>Loading...</div> : <Outlet />}

      <Toaster />
      <ScrollRestoration />
    </div>
  );
};

export default App;
