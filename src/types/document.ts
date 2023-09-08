export type TDocument = {
  collection_id: string;
  id: string;
  file_name: string;
  created_at: string;
};

export type TDocumentSegment = {
  id: string;
  text: string;
  metadata: {
    document_id: string;
  };
  score: number;
};

export type TDocumentSegmentsResp = {
  results: {
    query: string;
    results: TDocumentSegment[];
  }[];
};
