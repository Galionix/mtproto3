import { InputType, Field, Int } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class LeaveGroupsInput {
  @Field(() => [String])
  @Column()
  chatNames: string[];

  @Field(() => [String])
  @Column()
  botDbIds: string[];
}
