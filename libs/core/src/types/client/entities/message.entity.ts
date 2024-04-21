// type TMessageType = "text" | "photo" | "video" | "audio" | "sticker" | "reaction"
export enum EMessageType {
  TEXT = "TEXT",
  PHOTO = "PHOTO",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  STICKER = "STICKER",
  REACTION = "REACTION",
}
export const MessageTypeValues = Object.values(EMessageType);

type TTextMessagePayload = {
  scenarioIdForSpam?: string;
  text: string;
};
type TReactionMessagePayload = {
  reaction: string;
};

type TPhotoMessagePayload = {
  photo: string;
  caption?: string;
};

type TVideoMessagePayload = {
  video: string;
  caption?: string;
};

type TAudioMessagePayload = {
  audio: string;
  text?: string;
};

type TStickerMessagePayload = {
  sticker: string;
};
type TGeneralMessage<Type, Payload> = {
  type: Type;
  payload: Payload;
};

type TTextMessage = TGeneralMessage<EMessageType.TEXT, TTextMessagePayload>;
type TReactionMessage = TGeneralMessage<
  EMessageType.REACTION,
  TReactionMessagePayload
>;
type TPhotoMessage = TGeneralMessage<EMessageType.PHOTO, TPhotoMessagePayload>;
type TVideoMessage = TGeneralMessage<EMessageType.VIDEO, TVideoMessagePayload>;
type TAudioMessage = TGeneralMessage<EMessageType.AUDIO, TAudioMessagePayload>;
type TStickerMessage = TGeneralMessage<
  EMessageType.STICKER,
  TStickerMessagePayload
>;

export type TClientMessage =
  | TTextMessage
  | TReactionMessage
  | TPhotoMessage
  | TVideoMessage
  | TAudioMessage
  | TStickerMessage;

const myMessage: TClientMessage = {
  type: EMessageType.TEXT,
  payload: {
    text: "hello",
  },
};
// TODO: create graphql schema instead of this

export type TSendableMessage = TClientMessage & {
  receiver: bigInt.BigInteger | string;
  replyToMessageId?: number;
};
