import { CreateMessageInput, MessageEntity } from "@core/types/server";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { SpamRepositoryService } from "./spam-repository.service";
import { validateMessageInputByType } from "./utils";
import { Logger } from "@nestjs/common";
const l = new Logger("SpamRepositoryResolver");

@Resolver(() => MessageEntity)
export class SpamRepositoryResolver {
  constructor(private readonly spamRepositoryService: SpamRepositoryService) {}

  @Mutation(() => MessageEntity)
  async createSpamMessage(
    @Args("createSpamMessageInput") createSpamMessageInput: CreateMessageInput
  ) {
    if (!createSpamMessageInput.isSpam)
      throw new Error(
        "This message is not spam but you try to save it as spam. Set isSpam to true. or use another method."
      );

    validateMessageInputByType(createSpamMessageInput);

    return this.spamRepositoryService.create(createSpamMessageInput);
  }

  @Query(() => [MessageEntity], { name: "spamMessages" })
  async findAll() {
    const res = await this.spamRepositoryService.findAll();
    l.log(res);
    return res;
  }
  @Query(() => [MessageEntity], { name: "spamMessagesByDbName" })
  async findByDbName(@Args("db_name") db_name: string) {
    const res = await this.spamRepositoryService.findByDbName(db_name);
    l.log(res);
    return res;
  }
  // update
  @Mutation(() => MessageEntity)
  async updateSpamMessage(
    @Args("id", { type: () => String }) id: string,
    @Args("updateSpamMessageInput") updateSpamMessageInput: CreateMessageInput
  ) {
    validateMessageInputByType(updateSpamMessageInput);
    return this.spamRepositoryService.update(id, updateSpamMessageInput);
  }

  //remove
  @Mutation(() => Number)
  async removeSpamMessage(@Args("id", { type: () => String }) id: string) {
    return this.spamRepositoryService.remove(id);
  }
}
