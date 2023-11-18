import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IMainPageStore {
  sectionsInHeader: string[];
  toggleSectionInHeader: (section: string) => void;
}

export const useMainPageStore = create<IMainPageStore>()(
  devtools(
    persist(
      (set) => ({
        sectionsInHeader: ["scenarios"],

        toggleSectionInHeader: (section: string) => {
          set((state) => {
            const sectionsInHeader = state.sectionsInHeader.includes(section)
              ? state.sectionsInHeader.filter((s) => s !== section)
              : [...state.sectionsInHeader, section];
            return { sectionsInHeader };
          });
        },
      }),
      {
        name: "main-page-storage",
      }
    )
  )
);
