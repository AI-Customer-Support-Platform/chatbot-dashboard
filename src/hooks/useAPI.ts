import {
  TApi,
  TCollectionData,
  TCollectionInfo,
  TDocumentSegmentsResp,
  TPlan,
  TUserPlanDetail,
  UserStorage,
} from "@/types";
import fetcher from "@/utils/fetcher";

import useAccessToken from "./useAccessToken";

const useAPI = () => {
  const { getAccessToken } = useAccessToken();

  const fetcherQueryCollections = async (): Promise<{
    collections: TCollectionData[];
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
  ): Promise<TCollectionData> => {
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
    collections: TCollectionData[];
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
    collectionInfo: TCollectionInfo
  ) => {
    const token = await getAccessToken();

    return fetcher.post(
      `/collection/update`,
      {
        ...collectionInfo,
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

  const fetcherUserPlanDetail = async (): Promise<TUserPlanDetail> => {
    const token = await getAccessToken();

    return fetcher.get("/user/plan", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const fetcherSubscribePlan = async (
    api: TApi,
    plan: TPlan,
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

  const fetcherQueryDocumentSegments = async (
    collection_id: string,
    question: string
  ): Promise<TDocumentSegmentsResp> => {
    const token = await getAccessToken();

    return fetcher.post(
      `/query/${collection_id}`,
      {
        queries: [
          {
            query: question,

            top_k: 4,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const fetcherUpdateDocumentSegment = async (
    collectionId: string,
    text: string,
    segmentId: string
  ) => {
    const token = await getAccessToken();

    return fetcher.post(
      `/upsert/${collectionId}`,
      {
        documents: [
          {
            text,
            id: segmentId,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const fetcherUploadDocumentSegments = async (
    collectionId: string,
    segments: string[],

    sourceId: string
  ) => {
    const token = await getAccessToken();
    const documents = segments.map((segment) => ({
      text: segment,
      metadata: {
        source: "file",
        source_id: sourceId,
      },
    }));

    return fetcher.post(
      `/upsert/${collectionId}`,
      {
        documents,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const fetcherDeleteDocumentSegment = async (
    collectionId: string,
    segmentId: string
  ) => {
    const token = await getAccessToken();

    return fetcher.post(
      `/delete/${collectionId}`,
      {
        ids: [segmentId],
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
    fetcherDeleteCollection,
    fetcherUpdateCollection,
    fetcherUploadDocument,
    fetcherDeleteDocument,
    fetcherUserPlanDetail,
    fetcherSubscribePlan,
    fetcherManagePlan,
    fetcherUserStorage,
    fetcherQueryDocumentSegments,
    fetcherUpdateDocumentSegment,
    fetcherUploadDocumentSegments,
    fetcherDeleteDocumentSegment,
  };
};
export default useAPI;
