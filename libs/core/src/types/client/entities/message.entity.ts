// type TMessageType = "text" | "photo" | "video" | "audio" | "sticker" | "reaction"
export enum EMessageType {
  TEXT = "TEXT",
  PHOTO = "PHOTO",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  STICKER = "STICKER",
  REACTION = "REACTION",
}
export const EMessageTypeValues = Object.values(EMessageType);

type TTextMessagePayload = {
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

export type TMessageEntity =
  | TTextMessage
  | TReactionMessage
  | TPhotoMessage
  | TVideoMessage
  | TAudioMessage
  | TStickerMessage;

// TODO: create graphql schema instead of this

export type TSendableMessage = TMessageEntity & {
  receiver: number | bigInt.BigInteger;
  replyToMessageId?: number;
};
