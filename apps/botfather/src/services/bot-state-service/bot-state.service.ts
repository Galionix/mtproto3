import { BotEntity, BotStateEntity } from "@core/types/server";
import { Injectable, Logger } from "@nestjs/common";
import { BotRepositoryService } from "../bot-repository-service/bot-repository.service";
import { defaultBotState } from "./botState";

const l = new Logger("BotStateService");

@Injectable()
export class BotStateService {
  constructor(private readonly botRepositoryService: BotRepositoryService) {
    // initialize botStates from database on startup
    botRepositoryService.findAll().then((bots) => {
      bots.forEach((bot) => {
        this.botStates.push({
          ...defaultBotState,
          bot,
        });
      });
    });
  }

  private botStates: BotStateEntity[] = [];

  getBotState(botDbId: string): Readonly<BotStateEntity> {
    const botState = this.botStates.find(
      (botState) => botState.bot.botDbId === botDbId
    );

    return { ...botState };
  }
  removeBotState(botDbId: string) {
    this.botStates = this.botStates.filter(
      (botState) => botState.bot.botDbId !== botDbId
    );
  }

  getBotStates(): ReadonlyArray<BotStateEntity> {
    return this.botStates;
  }
  addBotState(botEntity: BotEntity) {
    const newBotState: BotStateEntity = {
      ...defaultBotState,
      bot: {
        ...botEntity,
        clientState: "",
        clientStateUpdateTime: new Date(Date.now()),
      },
    };
    this.botStates.push(newBotState);
  }

  /*
   * updateBotState
   * @param botDbId - botDbId of bot
   * @param botState - partial bot state to update
   * @returns void
   * @description
   * Updates bot state with new values
   * */
  updateBotState(botDbId: string, botState: Partial<BotStateEntity>) {
    const index = this.botStates.findIndex(
      (botState) => botState.bot.botDbId === botDbId
    );
    const currentState = this.botStates[index];

    this.botStates[index] = { ...currentState, ...botState };
  }

  /*
   * reload
   * @returns void
   * @description
   * Drops all bot states to initial state
   * */

  async reload() {
    l.log("Reloading bot states from database");
    await this.botRepositoryService.findAll().then((bots) => {
      this.botStates = bots.map((bot) => ({
        ...defaultBotState,
        bot,
      }));
    });

    return this.botStates;
  }
}
