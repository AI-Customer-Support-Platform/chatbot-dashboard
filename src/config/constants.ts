export interface Collection {
  name: string;
  description?: string;
  id: string;
  documents: IDocument[];
  created_at: string;
  updated_at: string;
}

export interface IDocument {
  collection_id: string;
  id: string;
  file_name: string;
  created_at: string;
}
