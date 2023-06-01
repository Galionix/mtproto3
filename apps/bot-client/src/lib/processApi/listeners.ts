import { groupManageListeners } from "../listeners/groupsManage";
import { changeUsernameListener } from "../listeners/username";
import { TListener } from "./combineListeners";

export const listeners: TListener[] = [
  changeUsernameListener,
  ...groupManageListeners,
];
