// scenario choice is entity of answers, containing extra data
// for use in scenarios.

import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { AnswerEntity } from "./answer.entity";
import { ScenarioBranchEntity } from "./scenarioBranch.entity";

@Entity()
@ObjectType()
export class ScenarioChoiceEntity extends AnswerEntity {
  @Field(() => String, { description: "next branch id", nullable: true })
  @Column({ default: null })
  nextBranchId?: string;

  @ManyToOne(() => ScenarioBranchEntity, (branch) => branch.choices)
  @Field(() => ScenarioBranchEntity, { description: "branch", nullable: true })
  // @Column({ nullable: true, default: null })
  branch: ScenarioBranchEntity;
}
