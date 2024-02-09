import { ServerEventTypes } from "@core/types/server";
import { IDefaultListenerArgs } from "../processApi/combineListeners";
import { Api } from "telegram";
import { logEvent } from "../processApi/logEventTostate";
import { sendStateToFatherProcess, state } from "../state";

export const setBio =
  ({ client }: IDefaultListenerArgs) =>
  async ({ firstName, lastName, about }) => {
    try {
      const result = await client.invoke(
        new Api.account.UpdateProfile({
          firstName,
          lastName,
          about,
        })
      );
      console.log(result); // prints the result
    } catch (error) {
      logEvent("ERROR_UPDATE_BIO", JSON.stringify({ error }));
    } finally {
      const me = await client.getMe();
      state.me = me as Api.User;
      const result = await client.invoke(
        new Api.users.GetFullUser({
          id: me,
        })
      );
      if ("firstName" in result.users[0]) {
        const firstName = result.users[0].firstName;
        const lastName = result.users[0].lastName;
        const about = result.fullUser.about;
        state.bio = {
          firstName,
          lastName,
          about,
        };
      }
      console.log(result); // prints the result
      sendStateToFatherProcess(state);
    }
  };

export const setBioListener = {
  event_type: ServerEventTypes.SET_BIO,
  listener: setBio,
};
