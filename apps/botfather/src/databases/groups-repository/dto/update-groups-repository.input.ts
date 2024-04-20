import { CreateGroupsRepositoryInput } from "./create-groups-repository.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateGroupsRepositoryInput extends PartialType(
  CreateGroupsRepositoryInput
) {}
