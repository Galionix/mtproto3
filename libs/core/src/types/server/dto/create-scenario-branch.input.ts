import { Field, InputType } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class CreateScenarioBranchInput {
  @Field(() => String, { description: "notes", nullable: true })
  @Column({ default: "" })
  description?: string;
}
