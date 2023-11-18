import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const resourcesInitialData = {
  images: [],
  audios: [],
  videos: [],
};

interface ResourcesStore {
  resources: typeof resourcesInitialData;
  setResources: (resources: typeof resourcesInitialData) => void;
  clearResources: () => void;
}

export const useResourcesStore = create<ResourcesStore>()(
  devtools(
    persist(
      (set) => ({
        resources: resourcesInitialData,
        setResources: (resources: typeof resourcesInitialData) => {
          set({ resources });
        },
        clearResources: () => set({ resources: resourcesInitialData }),
      }),
      {
        name: "resources-storage",
      }
    )
  )
);
