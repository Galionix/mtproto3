import {
  EGeneralBotEventTypes,
  TAnswer,
  TScenarioElement,
  TSendStateToServer,
  TState,
  TTask,
} from "@core/types/client";

// export type TDMMessagePoolItem = {};

export const state: TState = {
  dmDb: [],
  groupDb: [],
  channelDb: [],
  tasks: [],
  apiId: 0,
  apiHash: "",
  stringSession: "",
  behavior_model: "base",
  answers_db: "base",
  read_delay: 1000,
  type_delay_multiplier: 1,
  message_probability: 1,
  latestGroupJoinDate: 0,
  scenario: [],
};

export const sendStateToFatherProcess = (state: TState) => {
  console.log("state: ", state);
  const message: TSendStateToServer = {
    event_type: EGeneralBotEventTypes.SEND_STATE_TO_SERVER,
    state: JSON.stringify(state),
  };

  process.send(message);
};
