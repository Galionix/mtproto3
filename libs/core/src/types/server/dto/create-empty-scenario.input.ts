// create empty scenario input

import { Field, InputType } from "@nestjs/graphql";
import { Column } from "typeorm";
import { CreateScenarioBranchInput } from "./create-scenario-branch.input";

@InputType()
export class CreateScenarioInput {
  @Field(() => String, {
    description: "notes",
    nullable: true,
    defaultValue: "",
  })
  description?: string;

  @Field(() => Number, {
    description: "maxConversationLength",
    nullable: true,
    defaultValue: 0,
  })
  maxConversationLength: number;

  @Field(() => String, {
    description: "db_name",
    nullable: true,
    defaultValue: "base",
  })
  db_name: string;

  // CreateScenarioBranchInput
  // branches: CreateScenarioBranchInput[];

  @Field(() => [CreateScenarioBranchInput], {
    description: "branches",
    nullable: true,
  })
  branches: CreateScenarioBranchInput[];
}
