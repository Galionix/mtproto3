import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ScenarioEntity } from "./scenario.entity";
import { ScenarioChoiceEntity } from "./scenarioChoice.entity";

@Entity()
@ObjectType()
export class ScenarioBranchEntity {
  // id, description, choices
  @Field(() => String, { description: "entity id", nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { description: "notes", nullable: true })
  @Column({ default: "" })
  description?: string;

  //   @Field(() => [String], { description: "choicesIds", nullable: true })
  //   @Column({ default: [] })
  //   choicesIds?: string[];

  @ManyToOne(() => ScenarioEntity, (scenario) => scenario.branches)
  // @Column()
  scenario: ScenarioEntity;

  @OneToMany(() => ScenarioChoiceEntity, (choice) => choice.branch, {
    cascade: true,
  })
  // @Column()
  choices: ScenarioChoiceEntity[];
}
