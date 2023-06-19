// create empty scenario input

import { Field, InputType } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class CreateEmptyScenarioInput {
  @Field(() => String, { description: "notes", nullable: true })
  @Column({ default: "" })
  description?: string;

  @Field(() => Number, { description: "maxConversationLength", nullable: true })
  @Column({ default: 0 })
  maxConversationLength: number;

  @Field(() => String, { description: "db_name", nullable: true })
  @Column({ default: "base" })
  db_name: string;
}
