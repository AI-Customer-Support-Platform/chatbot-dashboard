export type TDocument = {
  collection_id: string;
  id: string;
  file_name: string;
  created_at: string;
};

export type TDocumentSplit = {
  id: string;
  text: string;
  metadata: {
    document_id: string;
  };
  score: number;
};

export type TDocumentSplitsResp = {
  results: {
    query: string;
    results: TDocumentSplit[];
  }[];
};
