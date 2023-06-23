import fetcher from "@/utils/fetcher";

export const fetcherCreateCollection = (name: string, token: string) =>
  fetcher.put(
    `/collection/${name}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
