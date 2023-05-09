import { CreateAnswerEntityInput } from "./create-database.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateDatabaseInput extends PartialType(CreateAnswerEntityInput) {}
