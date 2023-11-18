import { sendToBot } from "@core/functions";
import { BotEventTypes } from "@core/types/client";
import { JoinGroupsInput, LeaveGroupsInput, ServerEventTypes } from "@core/types/server";
import { Injectable } from "@nestjs/common";
import { ChildProcess } from "child_process";
import { BotStateService } from "../../services/bot-state-service/bot-state.service";
import { sanitizeGroupNames } from "./utils";

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
    chatNames,
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
            chatNames: sanitizeGroupNames(chatNames),
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
          joining_groups_chat_ids: chatNames,
        });
      }
    });

    return botStateService.getBotStates();
  }

  async leaveGroups({
    api_ids,
    chatNames
  }: LeaveGroupsInput) {
    const botStateService = this.botStateService;

    // const botStates = botStateService.getBotStates();

    api_ids.forEach(async (api_id) => {
      const botState = botStateService.getBotState(api_id);
      if (botState) {
        sendToBot(
          botState.childProcess as ChildProcess,
          {
            event_type: ServerEventTypes.LEAVE_GROUPS,
            chatNames: sanitizeGroupNames(chatNames),
          },
          false
        );

        botStateService.updateBotState(api_id, {
          leaving_groups: true,
          leaving_groups_chat_ids: chatNames,
        });
      }
    });

    return botStateService.getBotStates();
  }
}
