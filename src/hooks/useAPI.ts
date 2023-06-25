import fetcher from "@/utils/fetcher";
import useAccessToken from "./useAccessToken";

const useAPI = () => {
  const { getAccessToken } = useAccessToken();

  const fetcherQueryCollections = async (): Promise<{
    collections: Collection[];
  }> => {
    const token = await getAccessToken();

    return fetcher.get("/collection", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const fetcherQueryCollection = async (
    collection_id: string
  ): Promise<Collection> => {
    const token = await getAccessToken();

    return fetcher.get("/collection/query", {
      params: {
        collection_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const fetcherCreateCollection = async (
    name: string,
    description?: string
  ): Promise<{
    collections: Collection[];
  }> => {
    const token = await getAccessToken();

    return fetcher.put(
      "/collection",
      {
        name,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return {
    fetcherQueryCollections,
    fetcherCreateCollection,
    fetcherQueryCollection,
  };
};
export default useAPI;
