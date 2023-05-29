import { InputType, Field, Int } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class JoinGroupsInput {
  @Field(() => [String])
  @Column()
  chatNames: string[];

  @Field(() => [Int])
  @Column()
  api_ids: number[];

  @Field(() => String, { nullable: true })
  @Column()
  behavior_model = "default";

  @Field(() => Boolean, { nullable: true })
  @Column()
  processing_enabled = false;

  @Field(() => Int, { nullable: true })
  @Column()
  spam_frequency = 1000;

  @Field(() => Int, { nullable: true })
  @Column()
  join_delay = 5000;
}
