import { Injectable } from "@nestjs/common";
import { ChildProcess } from "child_process";
import { BotStateService } from "../../bot-state-service/bot-state.service";
import { BotEventTypes } from "../../messagesTypes/bot-events";
import { ServerEventTypes } from "../../messagesTypes/server-events";
import { sendToBotAndWait } from "../../messagesTypes/server-events/sendAndWait";
// import { BotEvents } from "../../messagesTypes/bot-events";
// import { ServerEventTypes } from "../../messagesTypes/server-events";
// import { sendAndWait } from "../../messagesTypes/server-events/sendAndWait";
// import { sendAndWait } from '../../utils/sendAndWait';
// import { BotProcessService } from '../../bot-process-service/bot-process.service';

@Injectable()
export class SettingsService {
  constructor(private readonly botStateService: BotStateService) {}

  async setUsername(api_id: number, username: string) {
    const botState = this.botStateService.getBotState(api_id);

    if (botState) {
      const result = await sendToBotAndWait(
        botState.childProcess as ChildProcess,
        {
          event_type: ServerEventTypes.SET_USERNAME,
          username,
          response_types: [
            BotEventTypes.USERNAME_SET,
            BotEventTypes.USERNAME_NOT_AVAILABLE,
          ],
        }
      );
      console.log("result: ", result);
      return result.event_type;
    }
  }
}
