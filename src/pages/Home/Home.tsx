import { useAuth0 } from "@auth0/auth0-react";

import APIs from "./components/APIs";
import Collections from "./components/Collections";
import UserInfo from "./components/UserInfo";

const Home = () => {
  const { user } = useAuth0();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-blue-100 to-white">
      {user && (
        <main className="container mx-auto p-4 sm:p-8 ">
          <UserInfo />
          {user.email_verified && <APIs />}
          <Collections />
        </main>
      )}
    </div>
  );
};
export default Home;
