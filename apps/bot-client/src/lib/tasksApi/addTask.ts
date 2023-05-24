import {
  EDMMessageStep,
  ETaskType,
  TRespondToDMMessage,
  TRespondToDMMessagePayload,
} from "@core/types/client";
import { TelegramClient } from "telegram";
import { sendStateToFatherProcess, state } from "../state";

export const addDmTask = async ({
  senderId,
  message,
  step,
}: TRespondToDMMessagePayload) => {
  const task: TRespondToDMMessage = {
    type: ETaskType.RESPOND_TO_DM_MESSAGE,
    date: Date.now(),
    payload: {
      step: step,
      message: message,
      senderId,
    },
  };
  state.tasks.push(task);
  sendStateToFatherProcess(state);
};
