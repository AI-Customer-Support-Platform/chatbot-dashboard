import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { persistOptions } from "./persist";
import { createUserSlice, UserSlice } from "./userSlice";

export type State = UserSlice;

export const useRootState = create<State>()(
  devtools(
    persist(
      immer((...args) => {
        return {
          ...createUserSlice(...args),
        };
      }),
      persistOptions
    )
  )
);
