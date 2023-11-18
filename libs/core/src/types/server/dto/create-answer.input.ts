import { Field, InputType } from "@nestjs/graphql";
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
  @Field(() => Boolean, { description: "isDmAnswer", nullable: true })
  @Column({ default: false })
  isDmAnswer?: boolean;

  // isGroupAnswer
  @Field(() => Boolean, { description: "isGroupAnswer", nullable: true })
  @Column({ default: false })
  isGroupAnswer?: boolean;

  // isChannelAnswer
  @Field(() => Boolean, { description: "isChannelAnswer", nullable: true })
  @Column({ default: false })
  isChannelAnswer?: boolean;

  // base_probability
  @Field(() => String, { description: "base_probability", nullable: true })
  @Column({ default: "1" })
  base_probability?: string;

  // behavior_model
  @Field(() => String, { description: "db_name", nullable: true })
  @Column({ default: "base" })
  db_name?: string;

  @Field(() => String, { description: "next branch id" })
  // @Column({ default: null })
  nextBranchId: string;

  // index
  @Field(() => Number, { description: "index", nullable: true })
  @Column({ default: 0 })
  index: number;
}
