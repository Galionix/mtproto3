import { Field, InputType } from "@nestjs/graphql";
import { InputMessageEntity, MessageEntity } from "../entities";
import { CreateMessageInput } from "./create-message.input";
import { Column } from "typeorm";

@InputType()
export class CreateAnswerEntityInput {
  @Field(() => [String], { description: "request" })
  request: string[];

  @Field(() => [CreateMessageInput], { description: "response" })
  responses: CreateMessageInput[];

  // description
  @Field(() => String, { description: "description", nullable: true })
  @Column({ default: "" })
  description?: string;

  // isDmAnswer
  @Field(() => Boolean, { description: "isDmAnswer" })
  @Column({ default: false })
  isDmAnswer?: boolean;

  // isGroupAnswer
  @Field(() => Boolean, { description: "isGroupAnswer" })
  @Column({ default: false })
  isGroupAnswer?: boolean;

  // isChannelAnswer
  @Field(() => Boolean, { description: "isChannelAnswer" })
  @Column({ default: false })
  isChannelAnswer?: boolean;

  // base_probability
  @Field(() => String, { description: "base_probability" })
  @Column({ default: "1" })
  base_probability?: string;

  // behavior_model
  @Field(() => String, { description: "db_name" })
  @Column({ default: "base" })
  db_name?: string;
}
