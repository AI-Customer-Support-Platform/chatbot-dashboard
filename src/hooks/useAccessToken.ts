const useAccessToken = () => {
  const getAccessToken = async () => {
    const token = localStorage.getItem("token");
    return token;
  };

  return { getAccessToken };
};
export default useAccessToken;
