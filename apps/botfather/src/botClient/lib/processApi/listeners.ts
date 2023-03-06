import { changeUsernameListener } from "../account/username";
import { TListener } from "./combineListeners";

export const listeners: TListener[] = [changeUsernameListener];
