import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import TitleWithRefreshButton from "@/components/TitleWithRefreshButton";

import APIItem from "./APIItem";
import { useAuth0 } from "@auth0/auth0-react";
import useUserPlanDetails from "@/hooks/useUserPlanDetails";

const APIs = () => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const { isLoading, refresh, planDetials } = useUserPlanDetails();

  return (
    <div className="w-full">
      <TitleWithRefreshButton
        title={t("APIs")}
        isLoading={isLoading}
        refresh={refresh}
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
  );
};
export default APIs;
