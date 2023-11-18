import { Field, InputType, Int } from "@nestjs/graphql";
import { Column } from "typeorm";
import { IsOptional } from "class-validator";

@InputType()
export class UpdateBotInput {
  @Field(() => String, { nullable: true })
  @Column()
  sessionString?: string;

  @Field({ nullable: true })
  @Column()
  clientState?: string;

  @Field(() => String, { nullable: true })
  @Column()
  behaviorModel?: string;

  @Field(() => String, { nullable: true })
  @Column()
  answersDb?: string;

  @Field(() => Int, { nullable: true })
  @Column()
  readDelay?: number;

  @Field(() => String, { nullable: true })
  @Column()
  typeDelayMultiplier?: number;

  @Field(() => String, { nullable: true })
  @Column()
  taskOrder?: string;

  @Field(() => Int, { nullable: true })
  @Column()
  afterTaskDelay?: number;

  @Field(() => Int, { nullable: true })
  @Column()
  afterTaskIdleTime?: number;

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  dmScenarioNames?: string[];

  @Field(() => String, { nullable: true })
  @Column()
  voice?: string;

  @Field(() => String, { nullable: true })
  @Column()
  replacements?: string;

  @Field(() => Int, { nullable: true })
  @Column()
  copyFrom?: number;

  @Field(() => String, { nullable: true })
  @Column()
  spamDBname?: string;

  @Field(() => String, { nullable: true })
  @Column()
  botName?: string;
}
