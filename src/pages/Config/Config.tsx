import useAPI from "@/hooks/useAPI";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionInfo from "./components/CollectionInfo";
import Documents from "./components/Documents";

const Config = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { collectionId } = useParams();
  const [collection, setCollection] = useState<Collection | undefined>(
    undefined
  );
  const { fetcherQueryCollection } = useAPI();

  const _fetcherQueryCollection = async () => {
    if (!collectionId || isLoading) return;

    setIsLoading(true);
    setCollection(undefined);
    const resp = await fetcherQueryCollection(collectionId);
    setIsLoading(false);
    setCollection(resp);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      _fetcherQueryCollection();
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-blue-100 to-white">
      <main className="container mx-auto p-4 sm:p-8">
        <CollectionInfo
          refresh={_fetcherQueryCollection}
          collection={collection}
        />
        <Documents
          handleClickRefresh={_fetcherQueryCollection}
          collection={collection}
        />
      </main>
    </div>
  );
};
export default Config;
