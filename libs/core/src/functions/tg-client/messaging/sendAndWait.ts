import { BotEvents } from "../../../types/client";
import {
  ServerEvents,
  ServerEventTypes,
} from "../../../types/server/server-events";
export const WAIT_FOR_SERVER_MESSAGE_TIMEOUT = 5000;

export function sendToFather(
  childProcess: NodeJS.Process,
  message: BotEvents,
  wait = true,
  waitTimeout = WAIT_FOR_SERVER_MESSAGE_TIMEOUT
): Promise<ServerEvents> {
  /*
message: {
    event_type: BotEventTypes.GET_DATABASE,
    database: answers_db,
    response_types: [
      EGetDatabaseResponseTypes.DB_GET_ERROR,
      EGetDatabaseResponseTypes.DB_GET_SUCCESS,
    ],
  }
*/

  return new Promise((resolve, reject) => {
    const timeout = wait
      ? setTimeout(() => {
          reject(new Error("Timeout waiting for parent process response"));
        }, waitTimeout)
      : null;

    const listener = (response: ServerEvents) => {
      // check if the response is one of the expected types
      // if (!response.event_type) {
      //   throw new Error(
      //     "sendToFather: message.response_types is not defined"
      //   );
      // }
      // message.response_types
      // response.event_type
      if (
        message.response_types &&
        message.response_types.length &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // WARNING: FIX THIS ASAP!!!!!!!!!!!!!!!!!!!!!
        message.response_types.includes(response?.event_type)
      ) {
        clearTimeout(timeout);
        childProcess.off("message", listener);
        resolve(response);
      }
    };

    childProcess.on("message", listener);
    childProcess.send(message);
  });
}
