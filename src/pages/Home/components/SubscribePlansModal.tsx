import CheckIcon from "@/components/icons/CheckIcon";
import LoadingIcon from "@/components/icons/LoadingIcon";
import ModalContainer from "@/components/modal/ModalContainer";
import { ApiType, PlanType, Plans } from "@/config/constants";
import useAPI from "@/hooks/useAPI";
import { uppercaseFirstLetter } from "@/utils/utils";
import { useState } from "react";
import toast from "react-hot-toast";

interface SubscribePlansModalProps {
  api: ApiType;
  setIsShow: (show: boolean) => void;
}

const SubscribePlansModal: React.FC<SubscribePlansModalProps> = ({
  api,
  setIsShow,
}) => {
  const plans: Plans[] = [
    {
      plan: "basic",
      price: 5000,
      features: [
        `Access to ${uppercaseFirstLetter(api)} API`,
        "750,000 tokens allocated",
        "Around 750 questions users can ask",
        "2MB document upload capacity",
        "Unlimited collection creation",
      ],
    },
    {
      plan: "standard",
      price: 15000,
      features: [
        `Access to ${uppercaseFirstLetter(api)} API`,
        "7500,000 tokens allocated",
        "Around 7,500 questions users can ask",
        "20MB document upload capacity",
        "Unlimited collection creation",
      ],
    },
    {
      plan: "plus",
      price: 22000,
      features: [
        `Access to ${uppercaseFirstLetter(api)} API`,
        "37,500,000 tokens allocated",
        "Around 37,500 questions users can ask",
        "100MB document upload capacity",
        "Unlimited collection creation",
      ],
    },
    {
      plan: "premium",
      price: 40000,
      features: [
        `Access to ${uppercaseFirstLetter(api)} API`,
        "75,000,000 tokens allocated",
        "Around 75,000 questions users can ask",
        "5000MB document upload capacity",
        "Unlimited collection creation",
      ],
    },
  ];

  return (
    <ModalContainer
      title={uppercaseFirstLetter(api) + " API Plans"}
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
  api: ApiType;
  plan: PlanType;
  price: number;
  features: string[];
}
const PlanCard: React.FC<PlanCardProps> = ({ api, plan, price, features }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetcherSubscribePlan } = useAPI();

  const handleClickSubscribe = async () => {
    if (!api || !plan) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetcherSubscribePlan(api, plan, window.origin);
      window.location.href = response.url;
    } catch (error) {
      toast.error("Something went wrong");
      console.error("error");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg border-2 border-slate-100 p-2 transition duration-200 hover:-translate-y-[1px] hover:border-slate-200 hover:shadow-lg sm:w-auto">
      <h2 className="mb-2 text-xl font-bold">{uppercaseFirstLetter(plan)}</h2>
      <section className="mb-4">
        <span className="font-inter text-3xl font-extrabold ">
          {price.toLocaleString()}¥
        </span>
        <span className="text-xl text-slate-500"> / month</span>
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
            Subscribe
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
