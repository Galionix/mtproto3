import { Column } from "typeorm";
import { CreateAnswerEntityInput } from "./create-answer.input";
import { Field, InputType, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateAnswersRepositoryInput extends PartialType(
  CreateAnswerEntityInput
) {
  @Field(() => String, { description: "entity id" })
  @Column("uuid")
  id: string;
}
