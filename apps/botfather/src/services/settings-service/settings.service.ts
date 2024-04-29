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

  async setUsername(botDbId: string, username: string) {
    const botState = this.botStateService.getBotState(botDbId);

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
    botDbIds,
    behavior_model,
    processing_enabled,
    spam_frequency,
    join_delay,
  }: JoinGroupsInput) {
    const botStateService = this.botStateService;

    botDbIds.forEach(async (botDbId, index) => {
      const botState = botStateService.getBotState(botDbId);

      if (botState) {
        sendToBot(
          botState.childProcess as ChildProcess,
          {
            event_type: ServerEventTypes.JOIN_GROUPS,
            chatNames: sanitizeGroupNames(chatNames),
            botDbIds,
            behavior_model,
            processing_enabled,
            spam_frequency,
            join_delay: join_delay * (index + 1),
          },
          false
        );

        botStateService.updateBotState(botDbId, {
          joining_groups: true,
          joining_groups_chat_ids: chatNames,
        });
      }
    });

    return botStateService.getBotStates();
  }

  async leaveGroups({ botDbIds, chatNames }: LeaveGroupsInput) {
    const botStateService = this.botStateService;

    // const botStates = botStateService.getBotStates();

    botDbIds.forEach(async (botDbId) => {
      const botState = botStateService.getBotState(botDbId);
      if (botState) {
        sendToBot(
          botState.childProcess as ChildProcess,
          {
            event_type: ServerEventTypes.LEAVE_GROUPS,
            chatNames: sanitizeGroupNames(chatNames),
          },
          false
        );

        botStateService.updateBotState(botDbId, {
          leaving_groups: true,
          leaving_groups_chat_ids: chatNames,
        });
      }
    });

    return botStateService.getBotStates();
  }
  async setPhoto(botDbId: string, photoName: string) {
    const botState = this.botStateService.getBotState(botDbId);

    if (botState) {
      sendToBot(
        botState.childProcess as ChildProcess,
        {
          event_type: ServerEventTypes.SET_PHOTO,
          photoName,
        },
        false
      );
    }
    return botState;
  }

  // remove photos
  async removePhotos(botDbId: string) {
    const botState = this.botStateService.getBotState(botDbId);

    if (botState) {
      sendToBot(
        botState.childProcess as ChildProcess,
        {
          event_type: ServerEventTypes.REMOVE_PHOTOS,
        },
        false
      );
    }
    return botState;
  }

  async setBio(
    botDbId: string,
    firstName: string,
    lastName: string,
    about: string
  ) {
    const botState = this.botStateService.getBotState(botDbId);

    if (botState) {
      sendToBot(
        botState.childProcess as ChildProcess,
        {
          event_type: ServerEventTypes.SET_BIO,
          firstName,
          lastName,
          about,
        },
        false
      );
    }
    return botState;
  }

  async hidePhoneNumber(botDbId: string) {
    const botState = this.botStateService.getBotState(botDbId);

    if (botState) {
      sendToBot(
        botState.childProcess as ChildProcess,
        {
          event_type: ServerEventTypes.HIDE_PHONE_NUMBER,
        },
        false
      );
    }
    return botState;
  }
}
