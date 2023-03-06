import { ChildProcess } from "child_process";
import { ServerEvents } from ".";
import { BotEvents } from "../bot-events";

export const WAIT_FOR_MESSAGE_TIMEOUT = 5000;

// export type TsendAndWaitProps = {
//   child: ChildProcess;
//   message: any;
//   onErr?: (err: Error) => void;
// };

/**
 * Sends a message to a child process and waits for a response.
 * @param {Object} props
 * @param {ChildProcess} props.child - The child process to send the message to
 * @param {any} props.message - The message to send
 * @returns {Promise<any>} - A promise that resolves to the response from the child process
 */

export function sendAndWait(
  childProcess: ChildProcess,
  message: ServerEvents
): Promise<BotEvents> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Timeout waiting for child process response"));
    }, WAIT_FOR_MESSAGE_TIMEOUT); // Change the timeout as needed

    const listener = (response) => {
      clearTimeout(timeout);
      childProcess.off("message", listener);
      resolve(response);
    };

    childProcess.on("message", listener);
    childProcess.send(message);
  });
}
