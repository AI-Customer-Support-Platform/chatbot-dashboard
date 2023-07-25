import CheckIcon from "@/components/icons/CheckIcon";
import ModalContainer from "@/components/modal/ModalContainer";

interface SubscribePlansModalProps {
  setIsShow: (show: boolean) => void;
}

const SubscribePlansModal: React.FC<SubscribePlansModalProps> = ({
  setIsShow,
}) => {
  return (
    <ModalContainer title="Web API Plans" setIsShow={setIsShow}>
      <section className="flex flex-wrap justify-center gap-4 font-lato">
        <PlanCard
          title="Basic"
          price={50}
          features={[
            "5000 Tokens Allocated",
            "2MB Document Upload Capacity",
            "Unlimited Collection Creation",
          ]}
        />
        <PlanCard
          title="Standard"
          price={60}
          features={[
            "10000 Tokens Allocated",
            "5MB Document Upload Capacity",
            "Unlimited Collection Creation",
          ]}
        />
        <PlanCard
          title="Plus"
          price={70}
          features={[
            "15000 Tokens Allocated",
            "10MB Document Upload Capacity",
            "Unlimited Collection Creation",
          ]}
        />
        <PlanCard
          title="Premium"
          price={80}
          features={[
            "20000 Tokens Allocated",
            "20MB Document Upload Capacity",
            "Unlimited Collection Creation",
          ]}
        />
      </section>
    </ModalContainer>
  );
};

interface PlanCardProps {
  title: string;
  price: number;
  features: string[];
}
const PlanCard: React.FC<PlanCardProps> = ({ title, price, features }) => {
  return (
    <div className="w-full rounded border-2 border-slate-100 p-2 sm:w-auto">
      <h2 className="mb-2 text-xl font-bold">{title}</h2>
      <section className="mb-4">
        <span className="font-inter text-3xl font-extrabold ">{price}$</span>
        <span className="text-xl text-slate-500"> / month</span>
      </section>
      <section className="mb-4">
        <ul>
          {features.map((feature) => (
            <FeatureListItem content={feature} />
          ))}
        </ul>
      </section>
      <section className="flex justify-center">
        <button className="transi w-full rounded border border-black py-2 font-bold duration-200 hover:bg-black hover:text-white">
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
