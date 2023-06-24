import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const pathname = useLocation().pathname;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && pathname !== "/login") {
    const navigate = useNavigate();
    navigate("/login");
  }
  return (
    <div className="min-h-screen">
      <Outlet />

      <ScrollRestoration />
    </div>
  );
};

export default App;
