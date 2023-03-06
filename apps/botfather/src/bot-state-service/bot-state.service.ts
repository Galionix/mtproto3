import { Injectable } from "@nestjs/common";
import { BotRepositoryService } from "../bot-repository-service/bot-repository.service";
import { BotStateEntity } from "../bot/entities/bot.entity";
import { defaultBotState } from "./botState";

@Injectable()
export class BotStateService {
  constructor(private readonly botRepositoryService: BotRepositoryService) {
    // initialize botStates from database on startup
    botRepositoryService.findAll().then((bots) => {
      bots.forEach((bot) => {
        this.botStates.push({
          ...defaultBotState,
          bot,
          // id: bot.id,
          //   api_id: bot.api_id,
          //   api_hash: bot.api_hash,
          //   sessionString: bot.sessionString,
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
    // const botStates = await this.botRepositoryService.findAll();
    // return this.botStates.map((botState) => {

    //     return {
    //         ...botState,
    //         bot: botStates.find((bot) => bot.api_id === botState.bot.api_id),
    //     };
    // });
    // return this.botStates.map(async (botState) => {
    //   return {
    //     ...botState,
    //     bot: await this.botRepositoryService.findOne(botState.bot.api_id),
    //   };
    // });
  }

  updateBotState(api_id: number, botState: Partial<BotStateEntity>) {
    const index = this.botStates.findIndex(
      (botState) => botState.bot.api_id === api_id
    );
    const currentState = this.botStates[index];

    this.botStates[index] = { ...currentState, ...botState };
  }
}
