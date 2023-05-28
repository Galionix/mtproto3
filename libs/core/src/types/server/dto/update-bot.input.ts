import { Field, InputType, Int } from "@nestjs/graphql";
import { Column } from "typeorm";
import { IsOptional } from "class-validator";

@InputType()
export class UpdateBotInput {
  @Field(() => String, { nullable: true })
  @Column()
  @IsOptional()
  behaviorModel?: string;

  @Field(() => String, { nullable: true })
  @Column()
  @IsOptional()
  answersDb?: string;

  @Field(() => Int, { nullable: true })
  @Column()
  @IsOptional()
  readDelay?: number;

  @Field(() => String, { nullable: true })
  @Column()
  @IsOptional()
  typeDelayMultiplier?: number;

  @Field(() => String, { nullable: true })
  @Column()
  @IsOptional()
  taskOrder?: string;

  @Field(() => Int, { nullable: true })
  @Column()
  @IsOptional()
  afterTaskDelay?: number;

  @Field(() => Int, { nullable: true })
  @Column()
  @IsOptional()
  afterTaskIdleTime?: number;

  @Field(() => String, { nullable: true })
  @Column()
  @IsOptional()
  scenario?: string;

  @Field(() => String, { nullable: true })
  @Column()
  @IsOptional()
  voice?: string;

  @Field(() => String, { nullable: true })
  @Column()
  @IsOptional()
  replacements?: string;
}
