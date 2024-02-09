import { groupManageListeners } from "../listeners/groupsManage";
import { removePhotosListener } from "../listeners/removePhotos";
import { setBioListener } from "../listeners/setBio";
import { changePhotoListener } from "../listeners/setPhoto";
import { changeUsernameListener } from "../listeners/username";
import { TListener } from "./combineListeners";

export const listeners: TListener[] = [
  changeUsernameListener,
  ...groupManageListeners,
  changePhotoListener,
  removePhotosListener,
  setBioListener,
];
