import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useAPI from "@/hooks/useAPI";
import { TUserPlanDetail } from "@/types";

import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast";
const useUserPlanDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [initLoaded, setInitLoaded] = useState(false);
  const [planDetials, setPlanDetails] = useState<TUserPlanDetail>({
    web: null,
    instagram: null,
    line: null,
  });
  const { fetcherUserPlanDetail } = useAPI();
  const { t } = useTranslation();
  const { user } = useAuth0();
  const fetchUserPlanDetails = useCallback(async () => {
    if (isLoading) {
      return;
    }

    if (!user?.email_verified) {
      toast(`⚠️ ${t("Email Verification Required")}`);
      return;
    }

    try {
      setIsLoading(true);
      setInitLoaded(true);
      const resp = await fetcherUserPlanDetail();
      setPlanDetails(resp);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [fetcherUserPlanDetail, isLoading, user, t]);

  useEffect(() => {
    if (!initLoaded) {
      const timer = setTimeout(() => {
        fetchUserPlanDetails();
      }, 0);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [fetchUserPlanDetails, initLoaded]);

  return {
    planDetials,
    refresh: fetchUserPlanDetails,
    isLoading,
  };
};
export default useUserPlanDetails;
