import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IBotsPageStore {
  visibleColumns: string[];
  setVisibleColumns: (columns: string[]) => void;
}

export const useBotsPageStore = create<IBotsPageStore>()(
  devtools(
    persist(
      (set) => ({
        visibleColumns: ["botDbId", "api_id", "api_hash"],

        setVisibleColumns: (columns: string[]) => {
          set({ visibleColumns: columns });
        },
      }),
      {
        name: "bots-page-storage",
      }
    )
  )
);
