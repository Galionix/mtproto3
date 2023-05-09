import { BotEventTypes } from "@core/types/client";
import { ServerEventTypes, JoinGroupsInput } from "@core/types/server";
import { Injectable } from "@nestjs/common";
import { ChildProcess } from "child_process";
import { BotStateService } from "../../services/bot-state-service/bot-state.service";
import { sendToBot } from "@core/functions/server/messaging/sendAndWait";

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
    behavior_model,
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
            behavior_model,
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

  async leaveGroups({
    api_ids,
    group_ids,
    leave_delay,
  }: {
    api_ids: number[];
    group_ids: string[];
    leave_delay: number;
  }) {
    const botStateService = this.botStateService;

    // const botStates = botStateService.getBotStates();

    api_ids.forEach(async (api_id) => {
      const botState = botStateService.getBotState(api_id);
      if (botState) {
        sendToBot(
          botState.childProcess as ChildProcess,
          {
            event_type: ServerEventTypes.LEAVE_GROUPS,
            group_ids,
            leave_delay,
          },
          false
        );

        botStateService.updateBotState(api_id, {
          leaving_groups: true,
          leaving_groups_chat_ids: group_ids,
        });
      }
    });

    return botStateService.getBotStates();
  }
}
