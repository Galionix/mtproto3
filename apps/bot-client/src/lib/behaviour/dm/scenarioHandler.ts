import {
  EScenarioElementType,
  TAnyDMMessageStep,
  TScenarioElement,
} from "@core/types/client";
import { state } from "../../state";
import { logEvent } from "../../processApi/logEventTostate";
import { TelegramClient } from "telegram";
import path from "path";
import { applyReplacements } from "../../utils/messagingUtils";

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
          message: applyReplacements(scenarioElement.text),
        });
      }
      break;
    case EScenarioElementType.VOICE:
      if ("fileName" in scenarioElement) {
        console.log("__dirname: ", __dirname);
        const filePath = path.join(
          __dirname,
          "..",
          "..",
          "..",
          "client-resources",
          "voices",
          state.voice,
          scenarioElement.fileName
        );
        console.log("filePath: ", filePath);
        await client.sendFile(senderId, {
          file: filePath,
          voiceNote: true,
        });
      }
      break;
  }
}
