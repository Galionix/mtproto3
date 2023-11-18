import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { TBranch } from "./create_old";

export const createScenarioInitialData = {
  description: "",
  branches: [],
  maxConversationLength: "100",
  db_name: "base",
};
// persist data across creation sessions
export type TCreateScenarioFormData = {
  description?: string;
  branches: TBranch[];
  maxConversationLength: string;
  db_name: string;
};

interface ICreateScenarioStore {
  scenario: TCreateScenarioFormData;
  setScenario: (scenario: TCreateScenarioFormData) => void;
  clearScenario: () => void;
}

export const useCreateScenarioStore = create<ICreateScenarioStore>()(
  devtools(
    persist(
      (set) => ({
        scenario: createScenarioInitialData,
        setScenario: (scenario: TCreateScenarioFormData) => {
          set({ scenario });
        },
        clearScenario: () => set({ scenario: createScenarioInitialData }),
      }),
      {
        name: "create-scenario-storage",
      }
    )
  )
);
