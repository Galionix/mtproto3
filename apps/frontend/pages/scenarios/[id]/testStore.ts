import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type TTab = {
  name: string;
  content: string;
};

interface ITestScenarioTabs {
  tabs: TTab[];
  setTabs: (tabs: TTab[]) => void;
}

export const useTestScenarioStore = create<ITestScenarioTabs>()(
  devtools(
    persist(
      (set) => ({
        tabs: [
          {
            name: "Tab 1",
            content: "Tab 1 content",
          },
          {
            name: "Tab 2",
            content: "Tab 2 content",
          },
          {
            name: "Tab 3",
            content: "Tab 3 content",
          },
        ],
        setTabs: (tabs: TTab[]) => set({ tabs }),
      }),
      {
        name: "bear-storage",
      }
    )
  )
);
