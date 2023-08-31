import { useAuth0 } from "@auth0/auth0-react";

// import APIs from "./components/APIs";
import Collections from "./components/Collections";

const Home = () => {
  const { user } = useAuth0();

  return (
    <div className="bg-primary min-h-screen">
      {user && (
        <>
          <main className="container mx-auto p-4 sm:p-8 ">
            {/* {user.email_verified && <APIs />} */}
            <Collections />
          </main>
        </>
      )}
    </div>
  );
};
export default Home;
