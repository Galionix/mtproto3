import {
  BotEntity,
  BotStateEntity,
  CreateBotInput,
  JoinGroupsInput,
  LeaveGroupsInput,
  UpdateBotInput,
} from "@core/types/server";
import { Logger } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BotProcessService } from "../services/bot-process-service/bot-process.service";
import { BotRepositoryService } from "../services/bot-repository-service/bot-repository.service";
import { BotStateService } from "../services/bot-state-service/bot-state.service";
import { SettingsService } from "../services/settings-service/settings.service";

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
    console.log("createBotInput: ", createBotInput);

    // if bot with this name already exists - throw error
    const isExistBotName = await this.botRepositoryService.findOneByName(
      createBotInput.botName
    );
    if (isExistBotName) throw new Error("Bot with this name already exists");

    // bot successfully creating
    const botEntity = await this.botRepositoryService.create(createBotInput);

    console.log("saved botEntity: ", botEntity);
    this.botStateService.addBotState(botEntity);
    await this.botProcessService.startBot(botEntity.api_id);
    console.log("botEntity: ", botEntity);

    return botEntity;
  }

  @Query(() => [BotEntity], { name: "bots" })
  async findAll() {
    return await this.botRepositoryService.findAll();
  }

  @Query(() => BotEntity, { name: "bot" })
  findOne(@Args("api_id", { type: () => Int }) api_id: number) {
    return this.botRepositoryService.findOne(api_id);
  }

  @Mutation(() => BotEntity)
  async removeBot(@Args("api_id", { type: () => Int }) api_id: number) {
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

  @Mutation(() => BotStateEntity, { name: "stopBot" })
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
    return await this.messagingSettingsService.joinGroups(joinGroupsInput);
  }

  @Mutation(() => [BotStateEntity], { name: "leaveGroups" })
  async leaveGroups(@Args("input") leaveGroupsInput: LeaveGroupsInput) {
    const { api_ids, chatNames } = leaveGroupsInput;

    return await this.messagingSettingsService.leaveGroups({
      api_ids,
      chatNames,
    });
  }
  // set photo
  @Mutation(() => BotStateEntity, { name: "setPhoto" })
  async setPhoto(
    @Args("api_id", { type: () => Int }) api_id: number,
    @Args("photoName") photoName: string
  ) {
    return await this.messagingSettingsService.setPhoto(api_id, photoName);
  }

  @Mutation(() => BotEntity, { name: "restartBot" })
  async restartBot(@Args("api_id", { type: () => Int }) api_id: number) {
    await this.botProcessService.stopBot(api_id);
    l.log("bot stopped: ", api_id);

    const res = await this.botProcessService.startBot(api_id);
    l.log("bot started: ", api_id);

    return res;
  }

  @Mutation(() => BotEntity, { name: "updateBot" })
  async updateBot(
    @Args("api_id", { type: () => Int }) api_id: number,
    @Args("updateBotInput") updateBotInput: UpdateBotInput
  ) {
    return await this.botRepositoryService.update(api_id, updateBotInput);
  }

  @Mutation(() => BotStateEntity, { name: "providePhoneNumber" })
  async providePhoneNumber(
    @Args("api_id", { type: () => Int }) api_id: number,
    @Args("phoneNumber") phoneNumber: string
  ) {
    return await this.botProcessService.providePhoneNumber(api_id, phoneNumber);
  }

  @Mutation(() => BotStateEntity, { name: "providePhoneCode" })
  async providePhoneCode(
    @Args("api_id", { type: () => Int }) api_id: number,
    @Args("phoneCode") phoneCode: string
  ) {
    return await this.botProcessService.providePhoneCode(api_id, phoneCode);
  }
  // provide2FACode
  @Mutation(() => BotStateEntity, { name: "provide2FACode" })
  async provide2FACode(
    @Args("api_id", { type: () => Int }) api_id: number,
    @Args("code") code: string
  ) {
    return await this.botProcessService.provide2FACode(api_id, code);
  }

  // removePhotos
  @Mutation(() => BotStateEntity, { name: "removePhotos" })
  async removePhotos(@Args("api_id", { type: () => Int }) api_id: number) {
    return await this.messagingSettingsService.removePhotos(api_id);
  }
}
