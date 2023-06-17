import { Field, InputType } from "@nestjs/graphql";
import { InputMessageEntity, MessageEntity } from "../entities";
import { CreateMessageInput } from "./create-message.input";

@InputType()
export class CreateAnswerEntityInput {
  @Field(() => [String], { description: "request" })
  request: string[];

  @Field(() => [CreateMessageInput], { description: "response" })
  responses: CreateMessageInput[];

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
  @Field(() => String, { description: "db_name" })
  db_name: string;
}
