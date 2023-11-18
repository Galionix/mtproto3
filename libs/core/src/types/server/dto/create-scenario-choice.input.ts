import { Field, InputType } from "@nestjs/graphql";
import { CreateAnswerEntityInput } from "./create-answer.input";
import { Column, ManyToOne } from "typeorm";
import { ScenarioBranchEntity } from "../entities";
import { CreateScenarioBranchInput } from "./create-scenario-branch.input";

// @InputType()
// export class CreateScenarioChoiceInput extends CreateAnswerEntityInput {
//   // @Field(() => String, { description: "next branch id" })
//   // @Column({ default: null })
//   // nextBranchId: string;

//   // @ManyToOne(() => ScenarioBranchEntity, (branch) => branch.choices)
//   // @Field(() => CreateScenarioBranchInput)
//   // branch: CreateScenarioBranchInput;
// }
