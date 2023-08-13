import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { UserStorage } from "@/types";

interface UserState {
  storage: UserStorage;
  setStorage: (storage: UserStorage) => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      immer((set) => ({
        storage: {
          remaining_space: 0,
          total_space: 0,
        },
        setStorage: (storage: UserStorage) => {
          set((state) => {
            state.storage = storage;
          });
        },
      })),
      { name: "user" }
    )
  )
);

export default useUserStore;
