import { TDocument } from "./document";

export type TCollectionInfo = {
  name: string;
  description?: string;
};

export type TCollectionData = TCollectionInfo & {
  id: string;
  documents: TDocument[];
  created_at: string;
  updated_at: string;
};
