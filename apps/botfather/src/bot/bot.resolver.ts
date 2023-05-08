import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { BotProcessService } from "../services/bot-process-service/bot-process.service";
import { BotStateService } from "../services/bot-state-service/bot-state.service";
import {
  JoinGroupsInput,
  BotEntity,
  BotStateEntity,
  CreateBotInput,
} from "@core/types/server";
import { BotRepositoryService } from "../services/bot-repository-service/bot-repository.service";
import { SettingsService } from "../services/settings-service/settings.service";
import { Logger } from "@nestjs/common";

const l = new Logger("BotResolver");

@Resolver(() => BotEntity)
export class BotResolver {
  constructor(
    private readonly botRepositoryService: BotRepositoryService,
    private readonly botProcessService: BotProcessService,
    private readonly botStateService: BotStateService,
    private readonly messagingSettingsService: SettingsService
  ) {}

  @Mutation(() => BotEntity)
  async createBot(@Args("createBotInput") createBotInput: CreateBotInput) {
    const res = await this.botRepositoryService.create(createBotInput);
    this.botStateService.addBotState(createBotInput);
    // await this.botStateService.reload();
    return res;
  }

  @Query(() => [BotEntity], { name: "bots" })
  findAll() {
    return this.botRepositoryService.findAll();
  }

  @Query(() => BotEntity, { name: "bot" })
  findOne(@Args("api_id", { type: () => Int }) api_id: number) {
    return this.botRepositoryService.findOne(api_id);
  }

  @Mutation(() => BotEntity)
  async removeBot(@Args("api_id", { type: () => Int }) api_id: number) {
    // 1. stop bot
    await this.botProcessService.stopBot(api_id);
    l.log("bot stopped: ", api_id);

    const res = await this.botRepositoryService.remove(api_id);
    l.log("removeBot: ", api_id);
    await this.botStateService.removeBotState(api_id);
    return res;
  }

  @Query(() => [BotEntity], { name: "startBots" })
  startBots() {
    return this.botProcessService.startBots();
  }

  @Query(() => BotEntity, { name: "startBot" })
  startBot(@Args("api_id", { type: () => Int }) api_id: number) {
    return this.botProcessService.startBot(api_id);
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

  @Mutation(() => [BotStateEntity], { name: "joinGroups" })
  async joinGroups(@Args("JoinGroupsInput") joinGroupsInput: JoinGroupsInput) {
    // flow is the following:
    // 1. give all bots task to join groups
    // 2. update their states and return them
    // 3. set approximate time of completion in state

    return await this.messagingSettingsService.joinGroups(joinGroupsInput);
  }

  @Mutation(() => [BotStateEntity], { name: "leaveGroups" })
  async leaveGroups(
    @Args("group_ids", { type: () => [String] }) group_ids: string[],
    @Args("api_ids", { type: () => [Int] }) api_ids: number[],
    @Args("leave_delay", { type: () => Int, nullable: true }) leave_delay = 5000
  ) {
    return await this.messagingSettingsService.leaveGroups({
      api_ids,
      group_ids,
      leave_delay,
    });
  }
}
