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


export const defaultScenario: TScenarioElement[] = [
  {
    type: EScenarioElementType.VOICE,
    fileName: "step1.ogg",
  },
  {
    type: EScenarioElementType.VOICE,
    fileName: "step2.ogg",
  },
  {
    type: EScenarioElementType.VOICE,
    fileName: "step3.ogg",
  },
  {
    type: EScenarioElementType.VOICE,
    fileName: "step4.ogg",
  },
  {
    type: EScenarioElementType.TEXT,
    text: "смотри, мой ник там ##botName##\r\nhttps://meetka1.name/?r=1515&sk=586\r\nможешь при регистрации пропускать все поля, это не важно)",
  },
  {
    type: EScenarioElementType.TEXT,
    text: "прости, не могу говорить, я уже в эфире",
  },
  {
    type: EScenarioElementType.TEXT,
    text: "если не сложно добавь меня в какой-то чатик для общения а то тут стало скучно😘",
  },
];

export const defaultValues: Omit<BotEntity, "api_id" | "api_hash"> = {
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
  copyFrom: -1,
  spamDBname: "base",
  botName: "baseName",
};
