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
  senderId: bigInt.BigInteger | string;
  replyTo?: number;
};
export default async function scenarioHandler({
  sendableMessage,
  client,
  senderId,
  replyTo,
}: TScenarioHandlerArgs) {
  if (!sendableMessage) {
    logEvent("ERROR_SCENARIO_HANDLER", "sendableMessage is undefined");
    return null;
  }

  console.log("sendableMessage.type: ", sendableMessage.type);
  switch (sendableMessage.type) {
    case EMessageType.TEXT:
      if ("text" in sendableMessage.payload && sendableMessage.payload.text) {
        if (sendableMessage.payload.text.includes("##link##")) {
          logEvent("LINK_SENT", "link sent");
        }
        await client.sendMessage(senderId, {
          message: applyReplacements(sendableMessage.payload.text),
          replyTo,
        });
      }
      // if (("replyToMessageId" in sendableMessage.payload)&&"text" in sendableMessage.payload && sendableMessage.payload.text) {
      //   if (sendableMessage.payload.text.includes("##link##")) {
      //     logEvent("LINK_SENT", "link sent");
      //   }
      //   await client.sendMessage(senderId, {
      //     message: applyReplacements(sendableMessage.payload.text),
      //     replyTo: sendableMessage.payload.replyToMessageId
      //   });
      // }
      break;
    case EMessageType.AUDIO:
      if ("audio" in sendableMessage.payload) {
        console.log("sendableMessage: ", sendableMessage);
        console.log("__dirname: ", __dirname);
        const filePath = path.join(
          __dirname,
          "..",
          "..",
          "..",
          "media",
          "audios",
          // state.voice,
          sendableMessage.payload.audio
        );
        await client.sendFile(senderId, {
          file: filePath,
          voiceNote: true,
          caption: sendableMessage.payload.text,
          replyTo,
        });
      }
      break;
  }
}

// export default function scenarioHandler({
//   count,
//   client,
//   senderId,
// }: TScenarioHandlerArgs) {
//   console.log(count, client, senderId);
// }