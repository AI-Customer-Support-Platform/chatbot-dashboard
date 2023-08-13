export type TApi = "web" | "instagram" | "line";
export type TPlan = "basic" | "standard" | "plus" | "premium";
export type TPlans = {
  plan: TPlan;
  price: number;
  features: string[];
};

export type TApiDetails = {
  plan: TPlan;
  remaining_tokens: number;
  total_tokens: number;
  remaining_space: number;
  total_space: number;
  start_at: string;
  expire_at: string;
};

export type TUserPlanDetail = {
  web: TApiDetails | null;
  instagram: TApiDetails | null;
  line: TApiDetails | null;
};
