import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { GroupsRepositoryService } from "./groups-repository.service";
// import { GroupsRepository } from "./entities/groups-repository.entity";
import { CreateGroupsRepositoryInput } from "./dto/create-groups-repository.input";
import { UpdateGroupsRepositoryInput } from "./dto/update-groups-repository.input";
import { GroupEntity } from "@core/types/server";

@Resolver(() => GroupEntity)
export class GroupsRepositoryResolver {
  constructor(
    private readonly groupsRepositoryService: GroupsRepositoryService
  ) {}

  @Mutation(() => GroupEntity)
  createGroupsRepository(
    @Args("createGroupsRepositoryInput")
    createGroupsRepositoryInput: CreateGroupsRepositoryInput
  ) {
    return this.groupsRepositoryService.create(createGroupsRepositoryInput);
  }

  // @Query(() => [GroupEntity], { name: "GroupEntity" })
  // findAll() {
  //   return this.groupsRepositoryService.findAll();
  // }

  @Query(() => GroupEntity, { name: "GroupEntity" })
  findOne(@Args("id", { type: () => Int }) id: string) {
    return this.groupsRepositoryService.findOne(id);
  }

  @Mutation(() => GroupEntity)
  async updateGroupsRepository(
    @Args("updateGroupsRepositoryInput")
    updateGroupsRepositoryInput: UpdateGroupsRepositoryInput
  ) {
    const existingGroup = await this.groupsRepositoryService.findOne(
      updateGroupsRepositoryInput.id
    );
    return this.groupsRepositoryService.update(
      existingGroup,
      updateGroupsRepositoryInput
    );
  }

  @Mutation(() => GroupEntity)
  removeGroupsRepository(@Args("id", { type: () => Int }) id: number) {
    return this.groupsRepositoryService.remove(id);
  }
}
