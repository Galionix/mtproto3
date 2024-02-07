import { groupManageListeners } from "../listeners/groupsManage";
import { removePhotosListener } from "../listeners/removePhotos";
import { changePhotoListener } from "../listeners/setPhoto";
import { changeUsernameListener } from "../listeners/username";
import { TListener } from "./combineListeners";

export const listeners: TListener[] = [
  changeUsernameListener,
  ...groupManageListeners,
  changePhotoListener,
  removePhotosListener,
];
