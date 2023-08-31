import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";

const Main = () => {
  const { user } = useAuth0();
  return (
    <>
      {user && (
        <main className="mx-auto flex max-w-6xl flex-col p-4 sm:p-8">
          <Outlet />
        </main>
      )}
    </>
  );
};
export default Main;
