import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateAnswerEntityInput {
  @Field(() => String, { description: "request" })
  request: string;

  @Field(() => String, { description: "response" })
  response: string;

  // description
  @Field(() => String, { description: "description", nullable: true })
  description: string;

  // isDmAnswer
  @Field(() => Boolean, { description: "isDmAnswer" })
  isDmAnswer: boolean;

  // isGroupAnswer
  @Field(() => Boolean, { description: "isGroupAnswer" })
  isGroupAnswer: boolean;

  // isChannelAnswer
  @Field(() => Boolean, { description: "isChannelAnswer" })
  isChannelAnswer: boolean;

  // base_probability
  @Field(() => String, { description: "base_probability" })
  base_probability: string;

  // behavior_model
  @Field(() => String, { description: "behavior_model" })
  behavior_model: string;
}
