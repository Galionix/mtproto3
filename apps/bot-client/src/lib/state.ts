import {
  EGeneralBotEventTypes,
  TSendStateToServer,
  TState,
} from "@core/types/client";

export const state: TState = {
  voice: "",
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
  taskOrder: [],
  afterTaskDelay: 1000,
  afterTaskIdleTime: 10000,
  replacements: {},
};

// use this with caution!
// this will load the server and force it to write the state to the database
// ideally, this should be called every n minutes, or after longer periods of time
// the purpose of this is to make sure that the state is saved to the database
// which is not very important
export const sendStateToFatherProcess = (state: TState) => {

  const { dmDb, groupDb, channelDb, ...stateTosend } = state;
  const message: TSendStateToServer = {
    event_type: EGeneralBotEventTypes.SEND_STATE_TO_SERVER,
    state: JSON.stringify(stateTosend),
  };

  process.send(message);
};
