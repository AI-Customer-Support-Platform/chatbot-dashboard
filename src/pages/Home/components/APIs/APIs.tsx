import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import TitleWithRefreshButton from "@/components/TitleWithRefreshButton";
import useAPI from "@/hooks/useAPI";
import { TUserPlanDetail } from "@/types";

import APIItem from "./APIItem";
import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast";

const APIs = () => {
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

  return (
    <div className="mx-auto  w-full max-w-6xl justify-start">
      <div className="mb-8">
        <TitleWithRefreshButton
          title={t("APIs")}
          isLoading={isLoading}
          refresh={fetchUserPlanDetails}
        />

        {!isLoading && user?.email_verified ? (
          <section className="w-full">
            <APIItem name="web" apiDetails={planDetials.web} />
            <APIItem name="instagram" apiDetails={planDetials.instagram} />
            <APIItem name="line" apiDetails={planDetials.line} />
          </section>
        ) : (
          <section className="flex flex-col gap-2">
            <Skeleton className="h-20 max-w-3xl rounded-full" />
            <Skeleton className="h-20 max-w-3xl" />
            <Skeleton className="h-20 max-w-3xl" />
          </section>
        )}
      </div>
    </div>
  );
};
export default APIs;
