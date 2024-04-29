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

    const isExistByPhone = await this.botRepositoryService.findOneByPhone(
      createBotInput.api_hash
    );
    if (createBotInput.fromFile && isExistByPhone)
      throw new Error("Bot with this phone already exists");

    // bot successfully creating
    const botEntity = await this.botRepositoryService.create(createBotInput);

    console.log("saved botEntity: ", botEntity);
    this.botStateService.addBotState(botEntity);
    await this.botProcessService.startBot(botEntity.botDbId);
    console.log("botEntity: ", botEntity);

    return botEntity;
  }

  @Query(() => [BotEntity], { name: "bots" })
  async findAll() {
    return await this.botRepositoryService.findAll();
  }

  @Query(() => BotEntity, { name: "bot" })
  findOne(@Args("botDbId", { type: () => String }) botDbId: string) {
    return this.botRepositoryService.findOne(botDbId);
  }

  @Mutation(() => BotEntity)
  async removeBot(@Args("botDbId", { type: () => String }) botDbId: string) {
    await this.botProcessService.stopBot(botDbId);
    l.log("bot stopped: ", botDbId);

    const res = await this.botRepositoryService.remove(botDbId);
    l.log("removeBot: ", botDbId);
    await this.botStateService.removeBotState(botDbId);
    return res;
  }

  @Query(() => [BotEntity], { name: "startBots" })
  startBots() {
    return this.botProcessService.startBots();
  }
  // startBotsImmediately
  @Query(() => [BotEntity], { name: "startBotsImmediately" })
  startBotsImmediately() {
    return this.botProcessService.startBotsImmediately();
  }

  @Query(() => BotEntity, { name: "startBot" })
  startBot(@Args("botDbId", { type: () => String }) botDbId: string) {
    return this.botProcessService.startBot(botDbId);
  }

  @Query(() => [BotEntity], { name: "stopBots" })
  stopBots() {
    return this.botProcessService.stopBots();
  }

  @Query(() => BotStateEntity, { name: "getBotState" })
  getBotState(@Args("botDbId", { type: () => String }) botDbId: string) {
    return this.botStateService.getBotState(botDbId);
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
  stopBot(@Args("botDbId", { type: () => String }) botDbId: string) {
    return this.botProcessService.stopBot(botDbId);
  }

  @Mutation(() => String, { name: "setUsername" })
  async setUsername(
    @Args("botDbId", { type: () => String }) botDbId: string,
    @Args("username") username: string
  ) {
    return await this.messagingSettingsService.setUsername(botDbId, username);
  }

  @Query(() => [BotStateEntity], { name: "reloadStates" })
  async reloadStates() {
    return await this.botStateService.reload();
  }

  @Mutation(() => [BotStateEntity], { name: "joinGroups" })
  async joinGroups(@Args("JoinGroupsInput") joinGroupsInput: JoinGroupsInput) {
    return await this.messagingSettingsService.joinGroups(joinGroupsInput);
  }

  @Query(() => [String], { name: "getAvailableBotsByFiles" })
  async getAvailableBotsByFiles() {
    return await this.botRepositoryService.getAvailableBotsByFiles();
  }

  @Mutation(() => [BotStateEntity], { name: "leaveGroups" })
  async leaveGroups(@Args("input") leaveGroupsInput: LeaveGroupsInput) {
    const { botDbIds, chatNames } = leaveGroupsInput;

    return await this.messagingSettingsService.leaveGroups({
      botDbIds,
      chatNames,
    });
  }
  // set photo
  @Mutation(() => BotStateEntity, { name: "setPhoto" })
  async setPhoto(
    @Args("botDbId", { type: () => String }) botDbId: string,
    @Args("photoName") photoName: string
  ) {
    return await this.messagingSettingsService.setPhoto(botDbId, photoName);
  }

  @Mutation(() => BotEntity, { name: "restartBot" })
  async restartBot(@Args("botDbId", { type: () => String }) botDbId: string) {
    await this.botProcessService.stopBot(botDbId);
    l.log("bot stopped: ", botDbId);

    const res = await this.botProcessService.startBot(botDbId);
    l.log("bot started: ", botDbId);

    return res;
  }

  @Mutation(() => BotEntity, { name: "updateBot" })
  async updateBot(
    @Args("botDbId", { type: () => String }) botDbId: string,
    @Args("updateBotInput") updateBotInput: UpdateBotInput
  ) {
    return await this.botRepositoryService.update(botDbId, updateBotInput);
  }

  @Mutation(() => BotStateEntity, { name: "providePhoneNumber" })
  async providePhoneNumber(
    @Args("botDbId", { type: () => String }) botDbId: string,
    @Args("phoneNumber") phoneNumber: string
  ) {
    return await this.botProcessService.providePhoneNumber(
      botDbId,
      phoneNumber
    );
  }

  @Mutation(() => BotStateEntity, { name: "providePhoneCode" })
  async providePhoneCode(
    @Args("botDbId", { type: () => String }) botDbId: string,
    @Args("phoneCode") phoneCode: string
  ) {
    return await this.botProcessService.providePhoneCode(botDbId, phoneCode);
  }
  // provide2FACode
  @Mutation(() => BotStateEntity, { name: "provide2FACode" })
  async provide2FACode(
    @Args("botDbId", { type: () => String }) botDbId: string,
    @Args("code") code: string
  ) {
    return await this.botProcessService.provide2FACode(botDbId, code);
  }

  // removePhotos
  @Mutation(() => BotStateEntity, { name: "removePhotos" })
  async removePhotos(@Args("botDbId", { type: () => String }) botDbId: string) {
    return await this.messagingSettingsService.removePhotos(botDbId);
  }

  // setBio
  @Mutation(() => BotStateEntity, { name: "setBio" })
  async setBio(
    @Args("botDbId", { type: () => String }) botDbId: string,
    @Args("firstName") firstName: string,
    @Args("lastName") lastName: string,
    @Args("about") about: string
  ) {
    return await this.messagingSettingsService.setBio(
      botDbId,
      firstName,
      lastName,
      about
    );
  }

  @Mutation(() => BotStateEntity, { name: "hidePhoneNumber" })
  async hidePhoneNumber(
    @Args("botDbId", { type: () => String }) botDbId: string
  ) {
    return await this.messagingSettingsService.hidePhoneNumber(botDbId);
  }
}
