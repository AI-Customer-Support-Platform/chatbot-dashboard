import { Link } from "react-router-dom";

import { truncate } from "@/utils/utils";

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
  return (
    <>
      <Link to={`/config/${collectionId}`}>
        <button className="flex h-52 w-full flex-col justify-between rounded  border border-slate-200 bg-white shadow transition duration-150 hover:border-slate-300 hover:shadow-lg">
          <section className="mb-8 h-full overflow-hidden overflow-ellipsis p-4  text-start">
            <h2 className="mb-2 text-2xl font-bold">{name}</h2>
            {description && (
              <p className="text-gray-500">{truncate(description, 250)}</p>
            )}
          </section>
        </button>
      </Link>
    </>
  );
};

export default CollectionCard;
