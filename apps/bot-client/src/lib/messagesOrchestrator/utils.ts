import { MessageEntity } from "@core/types/server";

export const responseMessageEmpty = (responseMessage: MessageEntity) => {
  if (responseMessage === null) return true;
};
