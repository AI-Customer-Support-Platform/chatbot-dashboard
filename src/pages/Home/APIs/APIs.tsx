import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import TitleWithRefreshButton from "@/components/TitleWithRefreshButton";
import useUserPlanDetails from "@/hooks/useUserPlanDetails";
import { useAuth0 } from "@auth0/auth0-react";

import APIItem from "./APIItem";

const APIs = () => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const { isLoading, refresh, planDetials } = useUserPlanDetails();

  return (
    <div className="w-full">
      <TitleWithRefreshButton
        title={t("API Usage")}
        isLoading={isLoading}
        refresh={refresh}
      />

      {!isLoading && user?.email_verified ? (
        <section className="w-full">
          <APIItem name="web" apiDetails={planDetials.web} />
          {/* <APIItem name="line" apiDetails={planDetials.line} />
          <APIItem name="instagram" apiDetails={planDetials.instagram} /> */}
        </section>
      ) : (
        <section className="flex flex-col gap-2">
          <Skeleton className="h-20 max-w-3xl" />
          {/* <Skeleton className="h-20 max-w-3xl" />
          <Skeleton className="h-20 max-w-3xl" /> */}
        </section>
      )}
    </div>
  );
};
export default APIs;
