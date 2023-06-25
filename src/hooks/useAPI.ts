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

  const fetcherDeleteCollection = async (collection_id: string) => {
    const token = await getAccessToken();

    return fetcher.post(
      `/delete/${collection_id}`,
      {
        delete_all: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const fetcherUpdateCollection = async (
    collection_id: string,
    name: string,
    description?: string
  ) => {
    const token = await getAccessToken();

    return fetcher.post(
      `/collection/update`,
      {
        name,
        description,
      },
      {
        params: {
          collection_id,
        },
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
    fetcherDeleteCollection,
    fetcherUpdateCollection,
  };
};
export default useAPI;
