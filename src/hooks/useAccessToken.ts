import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const useAccessToken = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { t } = useTranslation();

  const getAccessToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      return accessToken;
    } catch (error) {
      console.log(error);
      toast.error(t("Failed to get access token"));
      return "";
    }
  };

  return { getAccessToken };
};
export default useAccessToken;
