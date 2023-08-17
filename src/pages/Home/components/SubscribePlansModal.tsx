import { LoadingIcon } from "@/components/icons";
import ModalContainer from "@/components/modal/ModalContainer";
import { TApi, TPlan, TPlans } from "@/types";
import useAPI from "@/hooks/useAPI";
import { uppercaseFirstLetter } from "@/utils/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import { CheckIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";

interface SubscribePlansModalProps {
  api: TApi;
  setIsShow: (show: boolean) => void;
}

const SubscribePlansModal: React.FC<SubscribePlansModalProps> = ({
  api,
  setIsShow,
}) => {
  const { t } = useTranslation();

  const generateFeatures = (
    api: string,
    tokens: string,
    questions: string,
    upload: string
  ) => [
    t("AccessToApi", { api: uppercaseFirstLetter(api) }),
    t("TokensAllocated", { tokens }),
    t("QuestionsUsersCanAsk", { questions }),
    t("DocumentUploadCapacity", { upload }),
    t("UnlimitedCollectionCreation"),
  ];

  const plans: TPlans[] = [
    {
      plan: t("Basic"),
      price: 5000,
      features: generateFeatures(api, "75,000", "750", "2MB"),
    },
    {
      plan: t("Standard"),
      price: 15000,
      features: generateFeatures(api, "750,000", "7,500", "20MB"),
    },
    {
      plan: t("Plus"),
      price: 22000,
      features: generateFeatures(api, "3,750,000", "37,500", "100MB"),
    },
    {
      plan: t("Premium"),
      price: 40000,
      features: generateFeatures(api, "7,500,000", "75,000", "500MB"),
    },
  ];

  return (
    <ModalContainer
      title={uppercaseFirstLetter(api) + ` API ` + t("Plans")}
      setIsShow={setIsShow}
    >
      <section className="flex flex-wrap justify-center gap-4 font-lato">
        {plans.map((plan) => (
          <PlanCard key={plan.plan} api={api} {...plan} />
        ))}
      </section>
    </ModalContainer>
  );
};

interface PlanCardProps {
  api: TApi;
  plan: TPlan;
  price: number;
  features: string[];
}
const PlanCard: React.FC<PlanCardProps> = ({ api, plan, price, features }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetcherSubscribePlan } = useAPI();
  const { t } = useTranslation();

  const handleClickSubscribe = async () => {
    if (!api || !plan) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetcherSubscribePlan(api, plan, window.origin);
      window.location.href = response.url;
    } catch (error) {
      toast.error(t("Something went wrong"));
      console.error("error");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-w-[300px] flex-auto rounded-lg border-2 border-slate-100 p-2 transition duration-200 hover:-translate-y-[1px] hover:border-slate-200 hover:shadow-lg sm:w-auto md:max-w-md">
      <h2 className="mb-2 text-xl font-bold">{uppercaseFirstLetter(plan)}</h2>
      <section className="mb-4">
        <span className="font-inter text-3xl font-extrabold ">
          {price.toLocaleString()}¥
        </span>
        <span className="text-xl text-slate-500"> / {t("month")}</span>
      </section>
      <section className="mb-4">
        <ul>
          {features.map((feature) => (
            <FeatureListItem key={feature} content={feature} />
          ))}
        </ul>
      </section>
      <section className="flex justify-center">
        {isLoading ? (
          <LoadingIcon className="animate-spin" />
        ) : (
          <button
            onClick={handleClickSubscribe}
            className="w-full rounded border border-black py-2 font-inter font-bold transition duration-200 hover:bg-black hover:text-white"
          >
            {t("Subscribe")}
          </button>
        )}
      </section>
    </div>
  );
};

interface FeatureListItemProps {
  content: string;
}
const FeatureListItem: React.FC<FeatureListItemProps> = ({ content }) => {
  return (
    <li className="flex items-center gap-1">
      <span className="text-green-700">
        <CheckIcon />
      </span>
      <span className="text-slate-600">{content}</span>
    </li>
  );
};

export default SubscribePlansModal;
