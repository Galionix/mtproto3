import { CreateScenarioRepositoryInput } from "./create-scenario-repository.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateScenarioRepositoryInput extends PartialType(
  CreateScenarioRepositoryInput
) {
  @Field(() => Int)
  id: number;
}
