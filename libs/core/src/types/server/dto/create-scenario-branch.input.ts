import { Field, InputType } from "@nestjs/graphql";
import { Column } from "typeorm";
import { CreateAnswerEntityInput } from "./create-answer.input";
// import { CreateScenarioChoiceInput } from "./create-scenario-choice.input";

@InputType()
export class CreateScenarioBranchInput {
  // id provided by user
  @Field(() => String, { description: "id", nullable: true })
  @Column({ default: "" })
  id: string;

  @Field(() => String, { description: "notes", nullable: true })
  @Column({ default: "" })
  description?: string;

  @Field(() => [CreateAnswerEntityInput], {
    description: "choices",
    nullable: true,
  })
  choices: CreateAnswerEntityInput[];

  // index
  @Field(() => Number, { description: "index", nullable: true })
  @Column({ default: 0 })
  index: number;
}
