import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { BotEntity, BotStateEntity } from "./entities/bot.entity";
import { CreateBotInput } from "./dto/create-bot.input";
import { BotProcessService } from "../bot-process-service/bot-process.service";
import { BotRepositoryService } from "../bot-repository-service/bot-repository.service";
import { BotStateService } from "../bot-state-service/bot-state.service";
import { SettingsService } from "../bot-events-messaging-service/settings-service/settings.service";

@Resolver(() => BotEntity)
export class BotResolver {
  constructor(
    private readonly botRepositoryService: BotRepositoryService,
    private readonly botProcessService: BotProcessService,
    private readonly botStateService: BotStateService,
    private readonly messagingSettingsService: SettingsService
  ) {}

  @Mutation(() => BotEntity)
  createBot(@Args("createBotInput") createBotInput: CreateBotInput) {
    return this.botRepositoryService.create(createBotInput);
  }

  @Query(() => [BotEntity], { name: "bots" })
  findAll() {
    return this.botRepositoryService.findAll();
  }

  @Query(() => BotEntity, { name: "bot" })
  findOne(@Args("id", { type: () => Int }) api_id: number) {
    return this.botRepositoryService.findOne(api_id);
  }

  @Mutation(() => BotEntity)
  removeBot(@Args("id", { type: () => Int }) id: number) {
    return this.botRepositoryService.remove(id);
  }

  @Query(() => [BotEntity], { name: "startBots" })
  startBots() {
    return this.botProcessService.startBots();
  }

  @Query(() => [BotEntity], { name: "stopBots" })
  stopBots() {
    return this.botProcessService.stopBots();
  }

  @Query(() => BotStateEntity, { name: "getBotState" })
  getBotState(@Args("id", { type: () => Int }) api_id: number) {
    return this.botStateService.getBotState(api_id);
  }

  @Query(() => Int, { name: "getProcessesCount" })
  getProcessesCount() {
    return this.botProcessService.getProcessesCount();
  }

  @Query(() => [BotStateEntity], { name: "getBotStates" })
  getBotStates() {
    console.log("getBotStates");
    return this.botStateService.getBotStates();
  }

  @Query(() => BotStateEntity, { name: "stopBot" })
  stopBot(@Args("api_id", { type: () => Int }) api_id: number) {
    return this.botProcessService.stopBot(api_id);
  }

  @Mutation(() => String, { name: "setUsername" })
  async setUsername(
    @Args("api_id", { type: () => Int }) api_id: number,
    @Args("username") username: string
  ) {
    return await this.messagingSettingsService.setUsername(api_id, username);
  }

  @Query(() => [BotStateEntity], { name: "reloadStates" })
  async reloadStates() {
    return await this.botStateService.reload();
  }
}
