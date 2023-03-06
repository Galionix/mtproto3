import { Injectable } from "@nestjs/common";
import { BotRepositoryService } from "../bot-repository-service/bot-repository.service";
import { BotStateService } from "../bot-state-service/bot-state.service";
import { processMessagesTypes, TProcessMessages } from "./processMessages";

@Injectable()
export class BotMessageService {
  constructor(
    private readonly botStateService: BotStateService,
    private readonly botRepositoryService: BotRepositoryService
  ) {}

  botsMessagesReducer(message: TProcessMessages, api_id: number) {
    console.log("api_id: ", api_id);
    console.log("message: ", message);
    // update botStates
    const botState = this.botStateService
      .getBotStates()
      .find((botState) => botState.bot.api_id === api_id);
    if (botState) {
      switch (message.type) {
        case processMessagesTypes.STARTED:
          console.log("Bot started: ", api_id);
          this.botStateService.updateBotState(api_id, {
            isStarted: true,
            startedDate: Date.now(),
          });
          break;
        case processMessagesTypes.STOPPED:
          console.log("Bot stopped: ", message.identity.id);

          this.botStateService.updateBotState(api_id, {
            isStopped: true,
            stoppedDate: Date.now(),
          });
          break;
        case processMessagesTypes.ERROR:
          console.log("Bot errored: ", message.identity.id);
          this.botStateService.updateBotState(api_id, {
            isErrored: true,
            error: message.error,
          });
          //   botState.isErrored = true;
          //   botState.error = message.error;
          break;
        case processMessagesTypes.SET_SESSION_STRING:
          this.botRepositoryService.updateSessionString(
            api_id,
            message.sessionString
          );
          break;
      }
    }
  }
}
