import {
  EMessageType,
  EScenarioElementType,
  TAnyDMMessageStep,
  TScenarioElement,
  TSendableMessage,
} from "@core/types/client";
import { state } from "../../state";
import { logEvent } from "../../processApi/logEventTostate";
import { TelegramClient } from "telegram";
import path from "path";
import { applyReplacements } from "../../utils/messagingUtils";

export type TScenarioHandlerArgs = {
  sendableMessage: TSendableMessage;
  client: TelegramClient;
  senderId: bigInt.BigInteger;
};
export default async function scenarioHandler({
  sendableMessage,
  client,
  senderId,
}: TScenarioHandlerArgs) {
  if (!sendableMessage) {
    logEvent("ERROR_SCENARIO_HANDLER", "sendableMessage is undefined");
    return null;
  }

  switch (sendableMessage.type) {
    case EMessageType.TEXT:
      if ("text" in sendableMessage.payload) {
        await client.sendMessage(senderId, {
          message: applyReplacements(sendableMessage.payload.text),
        });
      }
      break;
    // case EMessageType.AUDIO:
    //   if ("fileName" in sendableMessage.payload) {
    //     console.log("__dirname: ", __dirname);
    //     const filePath = path.join(
    //       __dirname,
    //       "..",
    //       "..",
    //       "..",
    //       "client-resources",
    //       "voices",
    //       state.voice,
    //       sendableMessage.payload.fileName
    //     );
    //     console.log("filePath: ", filePath);
    //     await client.sendFile(senderId, {
    //       file: filePath,
    //       voiceNote: true,
    //     });
    //   }
    //   break;
  }
}

// export default function scenarioHandler({
//   count,
//   client,
//   senderId,
// }: TScenarioHandlerArgs) {
//   console.log(count, client, senderId);
// }