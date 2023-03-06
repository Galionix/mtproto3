import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { BotService } from "./bot.service";
import { BotEntity, BotStateEntity } from "./entities/bot.entity";
import { CreateBotInput } from "./dto/create-bot.input";
import { UpdateBotInput } from "./dto/update-bot.input";

@Resolver(() => BotEntity)
export class BotResolver {
  constructor(private readonly botService: BotService) {}

  @Mutation(() => BotEntity)
  createBot(@Args("createBotInput") createBotInput: CreateBotInput) {
    return this.botService.create(createBotInput);
  }

  @Query(() => [BotEntity], { name: "bots" })
  findAll() {
    return this.botService.findAll();
  }

  @Query(() => BotEntity, { name: "bot" })
  findOne(@Args("id", { type: () => String }) id: string) {
    return this.botService.findOne(id);
  }

  @Mutation(() => BotEntity)
  updateBot(@Args("updateBotInput") updateBotInput: UpdateBotInput) {
    return this.botService.update(updateBotInput.id, updateBotInput);
  }

  @Mutation(() => BotEntity)
  removeBot(@Args("id", { type: () => Int }) id: number) {
    return this.botService.remove(id);
  }

  @Query(() => [BotEntity], { name: "startBots" })
  startBots() {
    return this.botService.startBots();
  }

  @Query(() => [BotEntity], { name: "stopBots" })
  stopBots() {
    return this.botService.stopBots();
  }

  @Query(() => BotStateEntity, { name: "getBotState" })
  getBotState(@Args("id", { type: () => String }) id: string) {
    return this.botService.getBotState(id);
  }

  @Query(() => Int, { name: "getProcessesCount" })
  getProcessesCount() {
    return this.botService.getProcessesCount();
  }

  @Query(() => [BotStateEntity], { name: "getBotStates" })
  getBotStates() {
    return this.botService.getBotStates();
  }

  @Query(() => BotStateEntity, { name: "stopBot" })
  stopBot(@Args("id", { type: () => String }) id: string) {
    return this.botService.stopBot(id);
  }
}
