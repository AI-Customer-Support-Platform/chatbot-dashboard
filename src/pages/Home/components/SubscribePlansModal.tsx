import CheckIcon from "@/components/icons/CheckIcon";
import ModalContainer from "@/components/modal/ModalContainer";
import { uppercaseFirstLetter } from "@/utils/utils";

interface SubscribePlansModalProps {
  api: string;
  setIsShow: (show: boolean) => void;
}

const SubscribePlansModal: React.FC<SubscribePlansModalProps> = ({
  api,
  setIsShow,
}) => {
  const plans = [
    {
      plan: "Basic",
      price: 50,
      features: [
        `Access to ${uppercaseFirstLetter(api)} API`,
        "5000 Tokens Allocated",
        "2MB Document Upload Capacity",
        "Unlimited Collection Creation",
      ],
    },
    {
      plan: "Standard",
      price: 60,
      features: [
        `Access to ${uppercaseFirstLetter(api)} API`,
        "10000 Tokens Allocated",
        "5MB Document Upload Capacity",
        "Unlimited Collection Creation",
      ],
    },
    {
      plan: "Plus",
      price: 70,
      features: [
        `Access to ${uppercaseFirstLetter(api)} API`,
        "15000 Tokens Allocated",
        "10MB Document Upload Capacity",
        "Unlimited Collection Creation",
      ],
    },
    {
      plan: "Premium",
      price: 80,
      features: [
        `Access to ${uppercaseFirstLetter(api)} API`,
        "20000 Tokens Allocated",
        "20MB Document Upload Capacity",
        "Unlimited Collection Creation",
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
  api: string;
  plan: string;
  price: number;
  features: string[];
}
const PlanCard: React.FC<PlanCardProps> = ({ api, plan, price, features }) => {
  const handleClickSubscribe = () => {
    console.log("Subscribe to " + api + "--" + plan.toLowerCase());
  };
  return (
    <div className="w-full rounded-lg border-2 border-slate-100 p-2 transition duration-200 hover:-translate-y-[1px] hover:border-slate-200 hover:shadow-lg sm:w-auto">
      <h2 className="mb-2 text-xl font-bold">{plan}</h2>
      <section className="mb-4">
        <span className="font-inter text-3xl font-extrabold ">{price}$</span>
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
        <button
          onClick={handleClickSubscribe}
          className="w-full rounded border border-black py-2 font-inter font-bold transition duration-200 hover:bg-black hover:text-white"
        >
          Subscribe
        </button>
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
