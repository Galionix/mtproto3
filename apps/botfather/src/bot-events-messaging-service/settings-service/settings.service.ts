import { Injectable } from "@nestjs/common";
import { ChildProcess } from "child_process";
import { BotStateService } from "../../bot-state-service/bot-state.service";
import { JoinGroupsInput } from "../../bot/dto/join-group.input";
import { BotEventTypes } from "../../messagesTypes/bot-events";
import { ServerEventTypes } from "../../messagesTypes/server-events";
import { sendToBot } from "../../messagesTypes/server-events/sendAndWait";

@Injectable()
export class SettingsService {
  constructor(private readonly botStateService: BotStateService) {}

  async setUsername(api_id: number, username: string) {
    const botState = this.botStateService.getBotState(api_id);

    if (botState) {
      const result = await sendToBot(botState.childProcess as ChildProcess, {
        event_type: ServerEventTypes.SET_USERNAME,
        username,
        response_types: [
          BotEventTypes.USERNAME_SET,
          BotEventTypes.USERNAME_NOT_AVAILABLE,
        ],
      });
      console.log("result: ", result);
      return result.event_type;
    }
  }

  async joinGroups({
    chat_ids,
    api_ids,
    behaviour_model,
    processing_enabled,
    spam_frequency,
    join_delay,
  }: JoinGroupsInput) {
    const botStateService = this.botStateService;

    api_ids.forEach(async (api_id, index) => {
      const botState = botStateService.getBotState(api_id);

      if (botState) {
        sendToBot(
          botState.childProcess as ChildProcess,
          {
            event_type: ServerEventTypes.JOIN_GROUPS,
            chat_ids,
            api_ids,
            behaviour_model,
            processing_enabled,
            spam_frequency,
            join_delay: join_delay * (index + 1),
          },
          false
        );

        botStateService.updateBotState(api_id, {
          joining_groups: true,
          joining_groups_chat_ids: chat_ids,
        });
      }
    });

    return botStateService.getBotStates();
  }
}
