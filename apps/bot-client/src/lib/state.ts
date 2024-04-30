import {
  EGeneralBotEventTypes,
  TSendStateToServer,
  TState,
} from "@core/types/client";
import { syncableStateKeys } from "../constants";

const twoHours = 1000 * 60 * 60 * 2;

export const state: TState = {
  proxy: "",
  jsonData: {},
  botDbId: "",
  bio: {
    firstName: "",
    lastName: "",
    about: "",
  },
  me: null,
  tasksTries: {},
  audioDurations: {},
  voice: "",
  dmDb: [],
  groupDb: [],
  channelDb: [],
  spamDb: [],
  spamDbName: "",
  tasks: [],
  apiId: 0,
  apiHash: "",
  stringSession: "",
  behavior_model: "base",
  answers_db: "base",
  read_delay: 1000,
  type_delay_multiplier: 1,
  message_probability: 1,
  latestGroupJoinDate: 1685333489917,
  groupJoinInterval: twoHours,
  dmScenario: null,
  taskOrder: [],
  afterTaskDelay: 1000,
  afterTaskIdleTime: 10000,
  replacements: {},
  groupCounters: {},
  spamScenarios: [],
};

// use this with caution!
// this will load the server and force it to write the state to the database
// ideally, this should be called every n minutes, or after longer periods of time
// the purpose of this is to make sure that the state is saved to the database
// which is not very important
export const sendStateToFatherProcess = (state: TState) => {
  const stateToSync: Partial<TState> = syncableStateKeys.reduce((acc, key) => {
    acc[key] = state[key];
    return acc;
  }, {});

  // const { dmDb, groupDb, channelDb, ...stateTosend } = state;
  const message: TSendStateToServer = {
    event_type: EGeneralBotEventTypes.SEND_STATE_TO_SERVER,
    state: JSON.stringify(stateToSync),
  };

  process.send(message);
};
