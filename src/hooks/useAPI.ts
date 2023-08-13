import fetcher from "@/utils/fetcher";
import useAccessToken from "./useAccessToken";
import {
  ApiType,
  Collection,
  PlanType,
  UserPlanDetail,
} from "@/config/constants";
import { UserStorage } from "@/types";

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

  const fetcherUploadDocument = async (
    collection_id: string,
    file: File,
    file_name: string,
    metadata?: object
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("file_name", file_name);

    if (metadata !== undefined) {
      formData.append("metadata", JSON.stringify(metadata));
    }

    const token = await getAccessToken();

    return fetcher.post(`/upsert-file/${collection_id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const fetcherDeleteDocument = async (
    collection_id: string,
    document_id: string
  ) => {
    const token = await getAccessToken();

    return fetcher.post(
      `/delete/${collection_id}`,
      {
        filter: {
          source_id: document_id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const fetcherUserPlanDetail = async (): Promise<UserPlanDetail> => {
    const token = await getAccessToken();

    return fetcher.get("/user/plan", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const fetcherSubscribePlan = async (
    api: ApiType,
    plan: PlanType,
    url: string
  ): Promise<{ url: string }> => {
    const token = await getAccessToken();

    return fetcher.post(
      "/plan/create",
      {
        api,
        plan,
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const fetcherManagePlan = async (): Promise<{ url: string }> => {
    const token = await getAccessToken();

    return fetcher.get("/plan/update", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const fetcherUserStorage = async (): Promise<UserStorage> => {
    const token = await getAccessToken();

    return fetcher.get("/user/storage", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return {
    fetcherQueryCollections,
    fetcherCreateCollection,
    fetcherQueryCollection,
    fetcherDeleteCollection,
    fetcherUpdateCollection,
    fetcherUploadDocument,
    fetcherDeleteDocument,
    fetcherUserPlanDetail,
    fetcherSubscribePlan,
    fetcherManagePlan,
    fetcherUserStorage,
  };
};
export default useAPI;
