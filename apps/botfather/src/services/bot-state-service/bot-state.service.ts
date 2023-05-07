import { Injectable } from "@nestjs/common";
import { BotStateEntity } from "@core/types/server/entities";
import { defaultBotState } from "./botState";
import { BotRepositoryService } from "../bot-repository-service/bot-repository.service";

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

  getBotState(api_id: number): Readonly<BotStateEntity> {
    const botState = this.botStates.find(
      (botState) => botState.bot.api_id === api_id
    );

    return { ...botState };
  }

  getBotStates(): ReadonlyArray<BotStateEntity> {
    return this.botStates;
  }

  updateBotState(api_id: number, botState: Partial<BotStateEntity>) {
    const index = this.botStates.findIndex(
      (botState) => botState.bot.api_id === api_id
    );
    const currentState = this.botStates[index];

    this.botStates[index] = { ...currentState, ...botState };
  }

  async reload() {
    await this.botRepositoryService.findAll().then((bots) => {
      this.botStates = bots.map((bot) => ({
        ...defaultBotState,
        bot,
      }));
    });

    return this.botStates;
  }
}
