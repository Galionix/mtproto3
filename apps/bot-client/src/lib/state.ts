import { TAnswer } from "@core/types/client";

export type TState = {
  dmDb: TAnswer[];
  groupDb: TAnswer[];
  channelDb: TAnswer[];
  apiId: number;
  apiHash: string;
  stringSession: string;
  behavior_model: string;
  answers_db: string;
  read_delay: number;
  type_delay_multiplier: number;
  message_probability: number;
};

export const state: TState = {
  dmDb: [],
  groupDb: [],
  channelDb: [],
  apiId: 0,
  apiHash: "",
  stringSession: "",
  behavior_model: "base",
  answers_db: "base",
  read_delay: 1000,
  type_delay_multiplier: 1,
  message_probability: 1,
};
