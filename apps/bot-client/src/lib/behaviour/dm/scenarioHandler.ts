import { TAnyDMMessageStep, TScenarioElement } from "@core/types/client";
import { state } from "../../state";
import { logEvent } from "../../processApi/logEventTostate";

export default async function scenarioHandler({ count }: { count: number }) {
  const scenarioElement = state.scenario[count];

  if (!scenarioElement) {
    logEvent("ERROR_SCENARIO_HANDLER", "scenarioElement is undefined");
    return null;
  }
}
