import { ChildProcess } from "child_process";

export interface IBotState {
  id: string;
  api_id: number;
  api_hash: string;
  sessionString: string;
  isRunning: boolean;
  isStopped: boolean;
  stoppedDate: number;

  isStarted: boolean;
  startedDate: number;
  isErrored: boolean;
  error: Error;
  lastUpdate: number;
  lastMessage: string;
  childProcess: ChildProcess;
}

export const defaultBotState: IBotState = {
  id: "",
  api_id: 0,
  api_hash: "",
  sessionString: "",
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
};
