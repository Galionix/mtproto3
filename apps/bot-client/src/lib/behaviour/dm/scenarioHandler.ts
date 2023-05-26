import {
  EScenarioElementType,
  TAnyDMMessageStep,
  TScenarioElement,
} from "@core/types/client";
import { state } from "../../state";
import { logEvent } from "../../processApi/logEventTostate";
import { TelegramClient } from "telegram";

export type TScenarioHandlerArgs = {
  count: number;
  client: TelegramClient;
  senderId: bigInt.BigInteger;
};
export default async function scenarioHandler({
  count,
  client,
  senderId,
}: TScenarioHandlerArgs) {
  console.log(count);
  console.log(state.scenario);
  const scenarioElement = state.scenario[count];
  console.log("scenarioElement: ", scenarioElement);

  if (!scenarioElement) {
    logEvent("ERROR_SCENARIO_HANDLER", "scenarioElement is undefined");
    return null;
  }

  switch (scenarioElement.type) {
    case EScenarioElementType.TEXT:
      if ("text" in scenarioElement) {
        await client.sendMessage(senderId, {
          message: scenarioElement.text,
        });
      }
  }
}
