// import { BotEvents } from ".";
// import { ServerEvents } from "../../server";

// const WAIT_FOR_MESSAGE_TIMEOUT = 5000;
// export function sendToServerAndWait(message: BotEvents) {
//   return new Promise((resolve, reject) => {
//     const timeout = setTimeout(() => {
//       reject(new Error("Timeout waiting for main process response"));
//     }, WAIT_FOR_MESSAGE_TIMEOUT); // Change the timeout as needed

//     const listener = (response: ServerEvents) => {
//       if (
//         message.response_types &&
//         message.response_types.length &&
//         message.response_types.includes(response.event_type as any)
//       ) {
//         clearTimeout(timeout);
//         process.off("message", listener);
//         resolve(response);
//       }
//     };

//     process.on("message", listener);
//     process.send(message);
//   });
// }
