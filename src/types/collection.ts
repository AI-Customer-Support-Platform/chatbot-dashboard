import { TDocument } from "./document";

export type TCollectionInfo = {
  name: string;
  description?: string;
  fallback_msg?: string;
  line_channel_access_token?: string;
  line_language?: string;
};

export type TCollectionData = TCollectionInfo & {
  id: string;
  documents: TDocument[];
  created_at: string;
  updated_at: string;
};
