import { CreateAnswerEntityInput } from "./create-answer.input";
import { InputType, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateAnswersRepositoryInput extends PartialType(CreateAnswerEntityInput) {}
