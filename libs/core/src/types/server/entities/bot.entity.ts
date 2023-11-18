import { ObjectType, Field, Int, InputType } from "@nestjs/graphql";
// import { ChildProcess } from "child_process";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { TState } from "../../client";
import { IsOptional } from "class-validator";
// import { IBotState } from "../types/botState";

@Entity()
@ObjectType()
export class BotEntity {
  @Field(() => String, { nullable: true })
  @PrimaryColumn()
  api_id: number;

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

  @Field(() => Int, { nullable: true })
  @Column()
  copyFrom: number;

  @Field(() => String, { nullable: true })
  @Column()
  spamDBname: string;

  @Field(() => String, { nullable: true })
  @Column()
  botName: string;
}
