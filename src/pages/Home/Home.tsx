import { fetcherCreateCollection } from "@/apis/collection";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const handleClickToken = async () => {
    const token = await getAccessTokenSilently();

    console.log("Bearer " + token);
    return token;
  };

  const handleCreateCollection = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetcherCreateCollection("test", token);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!isAuthenticated && <Navigate to="/login" />}

      {user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <button onClick={handleClickToken}>token</button>
          <br />
          <button onClick={handleCreateCollection}>create collection</button>
        </div>
      )}
    </div>
  );
};
export default Home;
