import { PersistOptions } from "zustand/middleware";

import { UserStorage } from "@/types";

import { State } from "./root";

export type StateToPersist = {
  storage: UserStorage;
};

export const persistOptions: PersistOptions<State, StateToPersist> = {
  name: "persisted-state",
  partialize: (state) => ({
    storage: state.storage,
  }),
};
