import {
  CreateSpamMessageInput,
  MessageEntity
} from "@core/types/server";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { SpamRepositoryService } from "./spam-repository.service";
import { validateMessageInputByType } from "./utils";

@Resolver(() => MessageEntity)
export class SpamRepositoryResolver {
  constructor(
    private readonly spamRepositoryService: SpamRepositoryService
  ) {}

  @Mutation(() => MessageEntity)
  async createSpamMessage(
    @Args("createSpamMessageInput") createSpamMessageInput: CreateSpamMessageInput
  ) {
    console.log(createSpamMessageInput)
    validateMessageInputByType(createSpamMessageInput);

    return this.spamRepositoryService.create(createSpamMessageInput);
  }

  @Query(() => [MessageEntity], { name: "spamMessages" })
  async findAll() {
    return this.spamRepositoryService.findAll();
  }

  // // findSome
  // @Query(() => [SpamEntity], { name: "someAnswers" })
  // async someAnswers(
  //   @Args("findSomeAnswersInput")
  //   findSomeAnswersInput: UpdateDatabaseInput
  // ) {
  //   return this.spamDatabaseRepositoryService.findSome(findSomeAnswersInput);
  // }

  // @Query(() => SpamEntity, { name: "answer", nullable: true })
  // findOne(@Args("name", { type: () => String }) name: string) {
  //   return this.spamDatabaseRepositoryService.findOne(name);
  // }

  // @Mutation(() => Int)
  // removeAnswer(@Args("id", { type: () => String }) id: string) {
  //   return this.spamDatabaseRepositoryService.remove(id);
  // }
}
