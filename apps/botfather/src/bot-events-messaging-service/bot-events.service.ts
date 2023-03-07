import { Injectable } from "@nestjs/common";
import { BotRepositoryService } from "../bot-repository-service/bot-repository.service";
import { BotStateService } from "../bot-state-service/bot-state.service";
import {
  processMessagesTypes,
  TBotErrorMessage,
  TProcessMessages,
  TSetSessionString,
} from "../messagesTypes/bot-events/processMessages";
import { Logger } from "@nestjs/common";

const l = new Logger("BotEventsService");
// wtf

interface IServiceArgs {
  botStateService: BotStateService;
  botRepositoryService: BotRepositoryService;
}

type TListenerArgs<T = TProcessMessages, E = object> = {
  services: IServiceArgs;
  message: T;
  api_id: number;
} & E;

@Injectable()
export class BotEventsService {
  private listeners = {};
  constructor(
    private readonly botStateService: BotStateService,
    private readonly botRepositoryService: BotRepositoryService
  ) {
    this.listeners = {
      [processMessagesTypes.STARTED]: this.listenStarted,
      [processMessagesTypes.STOPPED]: this.listenStopped,
      [processMessagesTypes.ERROR]: this.listenError,
      [processMessagesTypes.SET_SESSION_STRING]: this.listenSetSessionString,
    };
  }

  listenStarted({ services, api_id }: TListenerArgs) {
    const { botStateService } = services;
    // console.log("Bot started: ", api_id);
    l.log("Bot started: ", api_id);
    botStateService.updateBotState(api_id, {
      isStarted: true,
      startedDate: Date.now(),
    });
  }
  listenStopped({ services, api_id }: TListenerArgs) {
    const { botStateService } = services;
    // console.log("Bot stopped: ", api_id);
    l.log("Bot stopped: ", api_id);

    botStateService.updateBotState(api_id, {
      isStopped: true,
      stoppedDate: Date.now(),
    });
  }
  listenError({ services, message, api_id }: TListenerArgs<TBotErrorMessage>) {
    const { botStateService } = services;
    // console.log("Bot errored: ", api_id);
    l.log("Bot errored: ", api_id);
    botStateService.updateBotState(api_id, {
      isErrored: true,
      error: message.error,
    });
  }
  listenSetSessionString({
    services,
    message,
    api_id,
  }: TListenerArgs<TSetSessionString>) {
    const { botRepositoryService } = services;
    botRepositoryService.updateSessionString(api_id, message.sessionString);
  }

  botsMessagesReducer(message: TProcessMessages, api_id: number) {
    const botState = this.botStateService
      .getBotStates()
      .find((botState) => botState.bot.api_id === api_id);

    const services: IServiceArgs = {
      botStateService: this.botStateService,
      botRepositoryService: this.botRepositoryService,
    };
    if (botState) {
      if (message.event_type in this.listeners) {
        this.listeners[message.event_type]({ services, message, api_id });
      }
    }
  }
}
