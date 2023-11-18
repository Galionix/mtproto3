import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ScenarioBranchEntity } from "./scenarioBranch.entity";

@Entity()
@ObjectType()
export class ScenarioEntity {
  @Field(() => ID, { description: "entity id" })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // db_name - maybe for couple scenarios for single bot.
  @Field(() => String, { description: "db_name", nullable: true })
  @Column({ default: "base" })
  db_name: string;

  // description - scenario description

  @Field(() => String, { description: "notes", nullable: true })
  @Column({ default: "" })
  description?: string;

  @Field(() => Date, { description: "createdAt", nullable: true })
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Field(() => Date, { description: "updatedAt", nullable: true })
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  //maxConversationLength - max length of conversation
  @Field(() => Number, { description: "maxConversationLength", nullable: true })
  @Column({ default: 0 })
  maxConversationLength: number;

  @OneToMany(() => ScenarioBranchEntity, (branch) => branch.scenario, {
    cascade: ["remove"],
  })
  @Field(() => [ScenarioBranchEntity])
  branches: ScenarioBranchEntity[];
}
