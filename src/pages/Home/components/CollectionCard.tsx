import { truncate } from "@/utils/utils";
import { useNavigate } from "react-router-dom";

interface CollectionCardProps {
  name: string;
  description?: string;
  collectionId: string;
}
const CollectionCard: React.FC<CollectionCardProps> = ({
  name,
  description,
  collectionId,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-between rounded-lg bg-white/40 p-4 transition-transform duration-300 hover:-translate-y-2 hover:bg-white/60 hover:shadow-lg">
      <section className="mb-8">
        <h2 className="text-xl font-bold">{name}</h2>
        {description && (
          <p className="text-gray-500">{truncate(description, 150)}</p>
        )}
      </section>
      <section>
        <CollectionButton
          handleClick={() => {
            navigate(`/config/${collectionId}`);
          }}
          name="Config"
        />
        <CollectionButton name="Chat" />
      </section>
    </div>
  );
};

interface CollectionButtonProps {
  name: string;
  className?: string;
  handleClick?: () => void;
}
const CollectionButton: React.FC<CollectionButtonProps> = ({
  name,
  className,
  handleClick,
}) => {
  return (
    <button
      onClick={handleClick}
      className={`mb-2 flex w-full items-center justify-center gap-2 rounded border bg-white/30 py-1 text-xl font-extralight text-black transition-transform duration-300 hover:-translate-y-[2px] hover:font-extrabold hover:opacity-90 hover:shadow-lg active:scale-105 ${className}`}
    >
      {name}
    </button>
  );
};
export default CollectionCard;
