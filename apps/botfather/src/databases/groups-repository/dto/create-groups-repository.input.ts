import { GroupEntity } from "@core/types/server";
import { InputType, Int, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class CreateGroupsRepositoryInput extends PartialType(GroupEntity) {}
