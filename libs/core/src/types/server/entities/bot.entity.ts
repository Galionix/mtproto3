import { ObjectType, Field, Int, InputType } from "@nestjs/graphql";
// import { ChildProcess } from "child_process";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { TState } from "../../client";
import { IsOptional } from "class-validator";
// import { IBotState } from "../types/botState";

@Entity()
@ObjectType()
export class BotEntity {
  @Field(() => String, { nullable: true })
  @PrimaryGeneratedColumn("uuid")
  botDbId: string;

  @Field(() => Int, { nullable: true })
  @Column()
  api_id: number;
  // phone
  @Field(() => String, { nullable: true })
  @Column()
  phone: string;

  @Field({ nullable: true })
  @Column()
  api_hash: string;

  @Field(() => String, { nullable: true })
  @Column()
  sessionString: string;

  @Field({ nullable: true })
  @Column()
  clientState: string;

  @Field(() => String, { nullable: true })
  @Column()
  clientStateUpdateTime: Date;

  @Field(() => String, { nullable: true })
  @Column()
  behaviorModel: string;

  @Field(() => String, { nullable: true })
  @Column()
  answersDb: string;

  @Field(() => Int, { nullable: true })
  @Column()
  readDelay: number;

  @Field(() => String, { nullable: true })
  @Column()
  typeDelayMultiplier: number;

  @Field(() => String, { nullable: true })
  @Column()
  taskOrder: string;

  @Field(() => Int, { nullable: true })
  @Column()
  afterTaskDelay: number;

  @Field(() => Int, { nullable: true })
  @Column()
  afterTaskIdleTime: number;

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  dmScenarioNames: string[];

  @Field(() => String, { nullable: true })
  @Column()
  voice: string;

  @Field(() => String, { nullable: true })
  @Column()
  replacements: string;

  @Field(() => String, { nullable: true })
  @Column()
  copyFrom: string;

  @Field(() => String, { nullable: true })
  @Column()
  spamDBname: string;

  @Field(() => String, { nullable: true })
  @Column()
  botName: string;

  // fromFile:boolean
  @Field(() => Boolean, { nullable: true })
  @Column()
  fromFile: boolean;
}
