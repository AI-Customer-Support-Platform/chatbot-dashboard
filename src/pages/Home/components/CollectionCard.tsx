import { truncate } from "@/utils/utils";

interface CollectionCardProps {
  name: string;
  description?: string;
}
const CollectionCard: React.FC<CollectionCardProps> = ({
  name,
  description,
}) => {
  return (
    <div className="flex flex-col justify-between rounded-lg bg-white p-4 shadow-lg transition-transform duration-300 hover:-translate-y-2">
      <section className="mb-8">
        <h2 className="text-xl font-bold">{name}</h2>
        {description && (
          <p className="text-gray-500">{truncate(description, 150)}</p>
        )}
      </section>
      <section>
        <CollectionButton name="Config" className="bg-black/80" />
        <CollectionButton name="Chat" className="bg-black/80" />
      </section>
    </div>
  );
};

interface CollectionButtonProps {
  name: string;
  className?: string;
}
const CollectionButton: React.FC<CollectionButtonProps> = ({
  name,
  className,
}) => {
  return (
    <button
      className={`mb-2 flex w-full items-center justify-center gap-2 rounded py-1 text-xl font-extrabold text-white transition-transform duration-300 hover:-translate-y-[2px] hover:opacity-90 hover:shadow-lg active:scale-105 ${className}`}
    >
      {name}
    </button>
  );
};
export default CollectionCard;
