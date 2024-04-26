import { InputType, Field, Int } from "@nestjs/graphql";
import {  IsNumber, Length } from "class-validator";
import { Column } from "typeorm";

@InputType()
export class CreateBotStateInput {
  @Field(() => Int, { nullable: true })
  @Column()
  @IsNumber()
  api_id: string;

  @Field(() => String, { nullable: true })
  @Column()
  // @Length(32, 32)
  api_hash: string;

  @Field(() => String, { nullable: true })
  @Column()
  sessionString: string;
}
