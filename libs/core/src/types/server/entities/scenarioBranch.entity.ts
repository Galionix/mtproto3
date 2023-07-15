import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ScenarioEntity } from "./scenario.entity";
import { AnswerEntity } from "./answer.entity";
// import { ScenarioChoiceEntity } from "./scenarioChoice.entity";

@Entity()
@ObjectType()
export class ScenarioBranchEntity {
  // id, description, choices
  @Field(() => String, { description: "entity id", nullable: true })
  @PrimaryColumn({ default: "" })
  id: string;

  @Field(() => String, { description: "notes", nullable: true })
  @Column({ default: "" })
  description?: string;

  @Field(() => ScenarioEntity, { description: "scenario", nullable: true })
  @ManyToOne(() => ScenarioEntity, (scenario) => scenario.branches, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  scenario: ScenarioEntity;

  @Field(() => [AnswerEntity], { description: "choices", nullable: true })
  @OneToMany(() => AnswerEntity, (choice) => choice.branch, {
    cascade: ["remove"],
  })
  choices: AnswerEntity[];
}
