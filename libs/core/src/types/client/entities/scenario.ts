export enum EScenarioElementType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  DOCUMENT = "DOCUMENT",
  VOICE = "VOICE",
  STICKER = "STICKER",
  ANIMATION = "ANIMATION",
  CONTACT = "CONTACT",
}

export type TAnyScenarioElementType = keyof typeof EScenarioElementType;

type TTextScenarioElement = {
  type: EScenarioElementType.TEXT;
  text: string;
};

type TImageScenarioElement = {
  type: EScenarioElementType.IMAGE;
  image: string;
  text?: string;
};

type TVideoScenarioElement = {
  type: EScenarioElementType.VIDEO;
  video: string;
  text?: string;
};

type TAudioScenarioElement = {
  type: EScenarioElementType.AUDIO;
  audio: string;
  text?: string;
};

export type TScenarioElement =
    | TTextScenarioElement
    | TImageScenarioElement
    | TVideoScenarioElement
    | TAudioScenarioElement;
// };
