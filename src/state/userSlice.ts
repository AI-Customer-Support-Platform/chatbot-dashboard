import { StateCreator } from "zustand";

import { UserStorage } from "@/types";

import { StateToPersist } from "./persist";
import { State } from "./root";

export type UserSlice = {
  storage: UserStorage;

  setStorage: (storage: UserStorage) => void;
};

export const createUserSlice: StateCreator<
  State,
  [],
  [
    ["zustand/devtools", never],
    ["zustand/persist", StateToPersist],
    ["zustand/immer", never],
  ],
  UserSlice
> = (set) => {
  return {
    storage: {
      remaining_space: 0,
      total_space: 0,
    },

    setStorage: (storage: UserStorage) => {
      set({
        storage,
      });
    },
  };
};
