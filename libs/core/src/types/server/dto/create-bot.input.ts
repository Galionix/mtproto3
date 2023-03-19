import { InputType, Field, Int } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class CreateBotInput {
  @Field(() => Int, { nullable: true })
  @Column()
  api_id: number;

  @Field(() => String, { nullable: true })
  @Column()
  api_hash: string;

  @Field(() => String, { nullable: true })
  @Column()
  sessionString: string;
}
