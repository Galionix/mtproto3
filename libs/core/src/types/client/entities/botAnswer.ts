import { CreateAnswerEntityInput } from "../../server";

export type TAnswer = Omit<
  CreateAnswerEntityInput,
  "response" | "isDmAnswer" | "isGroupAnswer" | "isChannelAnswer"
> & { response: TResponsesData };
export type TResponsesData = {
  a: string;
  p: string;
};
