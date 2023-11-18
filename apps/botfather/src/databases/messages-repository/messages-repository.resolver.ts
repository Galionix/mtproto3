import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { MessagesRepositoryService } from "./messages-repository.service";
import { UpdateMessageInput } from "./dto/update-messages-repository.input";
import { CreateMessageInput, MessageEntity } from "@core/types/server";

@Resolver(() => MessageEntity)
export class MessagesRepositoryResolver {
  constructor(
    private readonly messagesRepositoryService: MessagesRepositoryService
  ) {}

  @Mutation(() => MessageEntity)
  createMessage(
    @Args("createMessageInput")
    createMessagesRepositoryInput: CreateMessageInput
  ) {
    return this.messagesRepositoryService.create(createMessagesRepositoryInput);
  }

  @Mutation(() => [MessageEntity])
  createManyMessages(
    @Args("createManyMessagesInput", { type: () => [CreateMessageInput] })
    createManyMessagesInput: CreateMessageInput[]
  ) {
    return this.messagesRepositoryService.createMany(createManyMessagesInput);
  }

  @Query(() => [MessageEntity], { name: "messages" })
  findAll() {
    return this.messagesRepositoryService.findAll();
  }
  @Query(() => [MessageEntity], { name: "batchFind" })
  batchFind(@Args("ids", { type: () => [String] }) ids: MessageEntity["id"][]) {
    return this.messagesRepositoryService.batchFind(ids);
  }

  @Query(() => MessageEntity, { name: "message" })
  findOne(@Args("id", { type: () => String }) id: MessageEntity["id"]) {
    return this.messagesRepositoryService.findOne(id);
  }

  @Mutation(() => MessageEntity)
  updateMessage(
    @Args("id", { type: () => String }) id: MessageEntity["id"],
    @Args("updateMessageInput")
    updateMessagesRepositoryInput: UpdateMessageInput
  ) {
    return this.messagesRepositoryService.update(
      id,
      updateMessagesRepositoryInput
    );
  }

  @Mutation(() => Int)
  async removeMessages(
    @Args("ids", { type: () => [String] }) ids: MessageEntity["id"][]
  ) {
    return (await this.messagesRepositoryService.removeMany(ids)).affected;
  }
}
