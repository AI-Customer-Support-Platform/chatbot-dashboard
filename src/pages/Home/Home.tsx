import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";

const Home = () => {
  const { user } = useAuth0();

  return (
    <div className="min-h-screen bg-primary">
      {user && (
        <>
          <main className="container mx-auto p-4 sm:p-8 ">
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
};
export default Home;
