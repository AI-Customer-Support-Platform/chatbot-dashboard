import Skeleton from "react-loading-skeleton";

import { TCollectionData } from "@/types";

interface CollectionInfoProps {
  collectionData: TCollectionData | undefined;
}

const CollectionInfo: React.FC<CollectionInfoProps> = ({ collectionData }) => {
  return (
    <>
      <section className="mb-8">
        {collectionData ? (
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold">{collectionData.name}</h2>
            <p className="text-slate-600">{collectionData.description}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="w-96">
              <Skeleton className="text-3xl" />
            </div>
            <div className="w-96">
              <Skeleton className="text-3xl" />
            </div>
          </div>
        )}
      </section>
    </>
  );
};
export default CollectionInfo;
