import { Injectable } from "@nestjs/common";
import { ChildProcess } from "child_process";
import { BotStateService } from "../../bot-state-service/bot-state.service";
// import { BotEvents } from "../../messagesTypes/bot-events";
import { ServerEventTypes } from "../../messagesTypes/server-events";
import { sendAndWait } from "../../messagesTypes/server-events/sendAndWait";
// import { sendAndWait } from '../../utils/sendAndWait';
// import { BotProcessService } from '../../bot-process-service/bot-process.service';

@Injectable()
export class SettingsService {
  constructor(private readonly botStateService: BotStateService) {}

  async setUsername(api_id: number, username: string) {
    const process = this.botStateService.getBotState(api_id);

    if (process) {
      const result = await sendAndWait(process.childProcess as ChildProcess, {
        event_type: ServerEventTypes.SET_USERNAME,
        username,
      });
      console.log("result: ", result);
      return result.event_type;
    }
  }
}
