import useUserPlanDetails from "@/hooks/useUserPlanDetails";
import APIItem from "@/pages/Home/APIs/APIItem";
import { useAuth0 } from "@auth0/auth0-react";
import Skeleton from "react-loading-skeleton";
import CollectionInfo from "../../components/CollectionInfo";
import useCollectionData from "@/hooks/useCollectionData";
import { useTranslation } from "react-i18next";

const InstagramAPI = () => {
  const { isLoading, planDetials } = useUserPlanDetails();
  const { user } = useAuth0();
  const { collectionData } = useCollectionData();
  const { t } = useTranslation();

  return (
    <>
      <CollectionInfo collectionData={collectionData} />
      <h2 className="mb-4 text-3xl font-bold">Instagram API</h2>
      <p className="mb-8 text-xl font-bold">{t("Coming soon")}</p>
      {!isLoading && user?.email_verified ? (
        <section className="w-full">
          <APIItem name="instagram" apiDetails={planDetials.instagram} />
        </section>
      ) : (
        <section className="flex flex-col gap-2">
          <Skeleton className="h-20 max-w-3xl" />
        </section>
      )}
    </>
  );
};
export default InstagramAPI;
