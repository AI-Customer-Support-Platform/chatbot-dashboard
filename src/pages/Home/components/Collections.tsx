import { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
import CreateCollectionButton from "./CreateCollectionButton";
import Skeleton from "react-loading-skeleton";
import RefreshIcon from "@/components/icons/RefreshIcon";
import classNames from "classnames";
import useAPI from "@/hooks/useAPI";

const Collections = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const { fetcherQueryCollections } = useAPI();

  const _fetcherQueryCollections = async () => {
    setIsLoading(true);
    const resp = await fetcherQueryCollections();
    setCollections(resp.collections);
    setIsLoading(false);
  };

  const handleClickRefresh = () => {
    if (isLoading) return;

    _fetcherQueryCollections();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      _fetcherQueryCollections();
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <section className="mb-8 flex  items-center gap-4">
        <h1 className="text-3xl font-bold">My Collections</h1>
        <button
          onClick={handleClickRefresh}
          title="refresh"
          className={classNames(" text-slate-500", {
            "animate-spin": isLoading,
          })}
        >
          <RefreshIcon />
        </button>
      </section>
      <section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            <>
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </>
          ) : (
            <>
              <CreateCollectionButton />
              {collections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  name={collection.name}
                  description={collection?.description}
                />
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
};
export default Collections;
