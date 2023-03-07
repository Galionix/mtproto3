import { changeUsernameListener } from "../account/username";
import { groupManageListeners } from "../settings/groupsManage";
import { TListener } from "./combineListeners";

export const listeners: TListener[] = [
  changeUsernameListener,
  ...groupManageListeners,
];
