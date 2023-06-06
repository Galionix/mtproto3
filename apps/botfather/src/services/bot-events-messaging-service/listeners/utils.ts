import { TClientMessage } from "@core/types/client";
import { MessageEntity } from "@core/types/server";

export const messageTranformer = (
  message: MessageEntity[]
): TClientMessage[] => {
  return message.map((message) => {
    const { type, ...rest } = message;
    return {
      type,
      payload: rest,
    } as TClientMessage;
  });
};
