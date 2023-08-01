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

export type ApiType = "web" | "instagram" | "line";
export type PlanType = "basic" | "standard" | "plus" | "premium";
export interface Plans {
  plan: PlanType;
  price: number;
  features: string[];
}
