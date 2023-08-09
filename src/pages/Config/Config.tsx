import useAPI from "@/hooks/useAPI";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import CollectionInfo from "./components/CollectionInfo";
import Documents from "./components/Documents";
import { Collection } from "@/config/constants";

const Config = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [initLoaded, setInitLoaded] = useState(false);
  const { collectionId } = useParams();
  const [collection, setCollection] = useState<Collection | undefined>(
    undefined
  );
  const { fetcherQueryCollection } = useAPI();

  const fetchCollection = useCallback(async () => {
    if (!collectionId || isLoading) {
      return;
    }

    setIsLoading(true);
    setInitLoaded(true);
    setCollection(undefined);

    const resp = await fetcherQueryCollection(collectionId);

    setCollection(resp);
    setIsLoading(false);
  }, [collectionId, isLoading, fetcherQueryCollection]);

  useEffect(() => {
    if (!initLoaded) {
      const timer = setTimeout(() => {
        fetchCollection();
      }, 0);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [initLoaded, fetchCollection]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-blue-100 to-white">
      <main className="container mx-auto p-4 sm:p-8">
        <CollectionInfo refresh={fetchCollection} collection={collection} />
        <Documents
          handleClickRefresh={fetchCollection}
          collection={collection}
        />
      </main>
    </div>
  );
};
export default Config;
