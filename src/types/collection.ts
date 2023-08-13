import { TDocument } from "./document";

export type TCollection = {
  name: string;
  description?: string;
  id: string;
  documents: TDocument[];
  created_at: string;
  updated_at: string;
};
