import { useCallback, useEffect, useState } from "react";

import useAPI from "@/hooks/useAPI";
import { TCollectionData } from "@/types";

const useCollectionData = () => {
  const collectionId = localStorage.getItem("collection-id");
  const [isLoading, setIsLoading] = useState(false);
  const [initLoaded, setInitLoaded] = useState(false);
  const [collection, setCollection] = useState<TCollectionData | undefined>(
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

  return { refresh: fetchCollection, collectionData: collection };
};
export default useCollectionData;
