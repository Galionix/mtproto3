import { Injectable, Logger } from "@nestjs/common";
import { BotRepositoryService } from "../bot-repository-service/bot-repository.service";
import { BotStateService } from "../services/bot-state-service/bot-state.service";
import { TProcessMessages } from "../messagesTypes/bot-events/processMessages";
import { combinedListeners } from "./listeners";

const l = new Logger("BotEventsService");

interface IServiceArgs {
  botStateService: BotStateService;
  botRepositoryService: BotRepositoryService;
  l: Logger;
}

export type TListenerArgs<T = TProcessMessages, E = object> = {
  services: IServiceArgs;
  message: T;
  api_id: number;
} & E;

@Injectable()
export class BotEventsService {
  constructor(
    private readonly botStateService: BotStateService,
    private readonly botRepositoryService: BotRepositoryService
  ) {}

  botsMessagesReducer(message: TProcessMessages, api_id: number) {
    const botState = this.botStateService
      .getBotStates()
      .find((botState) => botState.bot.api_id === api_id);

    const services: IServiceArgs = {
      botStateService: this.botStateService,
      botRepositoryService: this.botRepositoryService,
      l,
    };
    if (botState) {
      if (message.event_type in combinedListeners) {
        combinedListeners[message.event_type]({ services, message, api_id });
      }
    }
  }
}
