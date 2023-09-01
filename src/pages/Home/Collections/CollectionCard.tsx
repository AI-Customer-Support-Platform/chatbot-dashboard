import { Link } from "react-router-dom";

import { calculateTimeDifference, truncate } from "@/utils/utils";

interface CollectionCardProps {
  name: string;
  description?: string;
  collectionId: string;
  updateTime: string;
}
const CollectionCard: React.FC<CollectionCardProps> = ({
  name,
  description,
  collectionId,
  updateTime,
}) => {
  return (
    <>
      <Link to={`/config/${collectionId}`}>
        <button className="flex h-52 w-full flex-col justify-between rounded  border border-slate-200 bg-white p-2 shadow transition duration-150 hover:border-slate-300 hover:shadow-lg">
          <section className="flex h-full flex-col justify-start overflow-hidden overflow-ellipsis  text-start">
            <h2 className="mb-2 text-2xl font-bold">{name}</h2>
            {description && (
              <p className="overflow-auto text-gray-500">
                {truncate(description, 250)}
              </p>
            )}
          </section>

          <span className="pt-2 text-start text-slate-500">
            {calculateTimeDifference(updateTime)} ago
          </span>
        </button>
      </Link>
    </>
  );
};

export default CollectionCard;
