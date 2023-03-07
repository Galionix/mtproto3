import { changeUsernameListener } from "../account/username";
import { joinGroupsListener } from "../settings/joinGroups";
import { TListener } from "./combineListeners";

export const listeners: TListener[] = [
  changeUsernameListener,
  joinGroupsListener,
];
