import { state } from "../state";
import { getRandomInt } from "@core/functions/general";
export const findDmAnswer = (request: string) => {
  let res: string = null;
  state.dmDb.forEach((answer) => {
    const requests = answer.request.split("|");
    requests.forEach((req) => {
      if (request.toLowerCase().includes(req.toLowerCase())) {
        //   pick random from answer.response array
        const randomValue = getRandomInt(answer.response.length);
        const foundAnswer = answer.response[randomValue];
        const messageProbabilityRes = Math.random();
        if (foundAnswer.p * state.message_probability > messageProbabilityRes) {
          res = foundAnswer.a;
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

