import { state } from "../state";
import { getRandomInt } from "@core/functions/general";
export const findDmAnswer = (request: string) => {
  let res = null;
  state.dmDb.forEach((answer) => {
    console.log("answer: ", answer);
    const requests = answer.request.split("|");
    requests.forEach((req) => {
      if (request.toLowerCase().includes(req.toLowerCase())) {
        //   pick random from answer.response array
        const randomValue = getRandomInt(answer.response.length);
        console.log("randomValue: ", randomValue);
        const foundAnswer = answer.response[randomValue];
        console.log("foundAnswer: ", foundAnswer);
        console.log("state.message_probability: ", state.message_probability);
        const messageProbabilityRes = Math.random();
        console.log("messageProbabilityRes: ", messageProbabilityRes);
        if (foundAnswer.p * state.message_probability > messageProbabilityRes) {
          res = foundAnswer.a;
          console.log("res: ", res);
        }
      }
      if (res) {
        return res;
      }
    });
    if (res) {
      return res;
    }
  });
  return res;
};
