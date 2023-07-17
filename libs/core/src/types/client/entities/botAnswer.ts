import { CreateAnswerEntityInput } from "../../server";

export type TAnswer = Omit<
  CreateAnswerEntityInput,
  "isDmAnswer" | "isGroupAnswer" | "isChannelAnswer" | "nextBranchId"
>;
