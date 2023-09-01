import useUserPlanDetails from "@/hooks/useUserPlanDetails";
import APIItem from "@/pages/Home/APIs/APIItem";
import { useAuth0 } from "@auth0/auth0-react";
import Skeleton from "react-loading-skeleton";

const InstagramAPI = () => {
  const { isLoading, planDetials } = useUserPlanDetails();
  const { user } = useAuth0();
  return (
    <div>
      <h2>Instagram API</h2>
      <p className="mb-8">Coming soon</p>
      {!isLoading && user?.email_verified ? (
        <section className="w-full">
          <APIItem name="instagram" apiDetails={planDetials.instagram} />
        </section>
      ) : (
        <section className="flex flex-col gap-2">
          <Skeleton className="h-20 max-w-3xl" />
        </section>
      )}
    </div>
  );
};
export default InstagramAPI;
