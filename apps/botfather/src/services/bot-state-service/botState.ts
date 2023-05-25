// import { ChildProcess } from "child_process";
import { BotEntity, BotStateEntity } from "@core/types/server";

// export interface IBotState {
//   //   id: string;
//   api_id: number;
//   api_hash: string;
//   sessionString: string;
//   isRunning: boolean;
//   isStopped: boolean;
//   stoppedDate: number;

//   isStarted: boolean;
//   startedDate: number;
//   isErrored: boolean;
//   error: Error;
//   lastUpdate: number;
//   lastMessage: string;
//   childProcess: ChildProcess;
// }

export const defaultBotState: BotStateEntity = {
  isRunning: false,
  isStopped: false,
  stoppedDate: 0,
  isStarted: false,
  startedDate: 0,
  isErrored: false,
  error: null,
  lastUpdate: 0,
  lastMessage: "",
  childProcess: null,
  eventLogs: [],
  bot: new BotEntity(),
  joining_groups: false,
  joining_groups_chat_ids: [],
  leaving_groups: false,
  leaving_groups_chat_ids: [],
  // clientStateUpdateTime: 0,
  // clientState: null,
  // inner_state: null,
};
