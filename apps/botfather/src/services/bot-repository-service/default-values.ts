import {
  EScenarioElementType,
  ETaskType,
  TScenarioElement,
  TTaskOrder,
} from "@core/types/client";
import { BotEntity } from "@core/types/server";

export const defaultTaskOrder: TTaskOrder = [
  ETaskType.RESPOND_TO_DM_MESSAGE,
  ETaskType.SPAM_TO_GROUP,
  ETaskType.GROUP_JOIN,
  ETaskType.GROUP_LEAVE,
  ETaskType.RESPOND_TO_GROUP_MESSAGE,
];

export const defaultValues: Omit<BotEntity, "api_id" | "api_hash" | "botDbId"> =
  {
    sessionString: "",
    clientState: "",
    clientStateUpdateTime: new Date(Date.now()),
    behaviorModel: "base",
    answersDb: "base",
    readDelay: 1000,
    dmScenarioNames: ["initial"],
    typeDelayMultiplier: 1,
    taskOrder: defaultTaskOrder.join(","),
    afterTaskDelay: 1000,
    afterTaskIdleTime: 1000,
    voice: "ksenia",
    replacements: "{}",
    copyFrom: "-1",
    spamDBname: "base",
    botName: "baseName",
    fromFile: false,
    phone: "",
  };
