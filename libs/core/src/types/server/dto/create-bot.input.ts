import { InputType, Field, Int } from "@nestjs/graphql";
import { IsJSON, IsNumber, IsOptional, Length } from "class-validator";
import { Column } from "typeorm";

@InputType()
export class CreateBotInput {
  @Field(() => Int, { nullable: true })
  @Column()
  @IsNumber()
  api_id: number;

  @Field(() => String, { nullable: true })
  @Column()
  @Length(32, 32)
  api_hash: string;

  @Field(() => String, { nullable: true })
  @Column()
  sessionString: string;

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

  @Field(() => Int, { nullable: true })
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
  @IsJSON()
  @IsOptional()
  scenario?: string;

  @Field(() => String, { nullable: true })
  @Column()
  @IsOptional()
  voice?: string;

  @Field(() => String, { nullable: true })
  @Column()
  @IsJSON()
  @IsOptional()
  replacements?: string;

  @Field(() => Int, { nullable: true })
  @Column()
  @IsOptional()
  copyFrom?: number;

  @Field(() => String, { nullable: true })
  botName: string;
}
