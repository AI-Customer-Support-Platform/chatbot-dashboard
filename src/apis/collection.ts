import fetcher from "@/utils/fetcher";

export const fetcherQueryCollections = (
  token: string
): Promise<{ collections: Collection[] }> =>
  fetcher.get("/collection", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
