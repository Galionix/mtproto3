import { changeUsernameListener } from "../listeners/username";
import { groupManageListeners } from "../listeners/groupsManage";
import { TListener } from "./combineListeners";

export const listeners: TListener[] = [
  changeUsernameListener,
  ...groupManageListeners,
];
