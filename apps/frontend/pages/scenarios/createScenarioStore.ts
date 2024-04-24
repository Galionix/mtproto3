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
  instructions: string;
  setScenario: (scenario: TCreateScenarioFormData) => void;
  clearScenario: () => void;
  setInstructions: (instructions: string) => void;
}

export const useCreateScenarioStore = create<ICreateScenarioStore>()(
  devtools(
    persist(
      (set) => ({
        scenario: createScenarioInitialData,
        instructions: "",
        setInstructions: (instructions: string) => {
          set({ instructions });
        },
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
