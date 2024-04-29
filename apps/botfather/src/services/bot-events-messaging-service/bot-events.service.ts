import { TProcessMessages } from "@core/types/client";
import { Injectable, Logger } from "@nestjs/common";
import { BotRepositoryService } from "../bot-repository-service/bot-repository.service";
import { BotStateService } from "../bot-state-service/bot-state.service";
import { combinedListeners } from "./listeners";
import { AnswersRepositoryService } from "../../databases/answers-repository/answers-repository.service";
import { SpamRepositoryService } from "../../databases/spam-repository/spam-repository.service";
import { ScenarioRepositoryService } from "../../databases/scenario-repository/scenario-repository.service";
import { GroupsRepositoryService } from "../../databases/groups-repository/groups-repository.service";
import { GlobalLogService } from "../../databases/global-log/global-log.service";

const l = new Logger("BotEventsService");

export interface IServiceArgs {
  botStateService: BotStateService;
  botRepositoryService: BotRepositoryService;
  answersRepositoryService: AnswersRepositoryService;
  spamRepositoryService: SpamRepositoryService;
  scenarioRepositoryService: ScenarioRepositoryService;
  groupsRepositoryService: GroupsRepositoryService;
  globalLogService: GlobalLogService;

  // add statistics service
  l: Logger;
}

export type TListenerArgs<T = TProcessMessages, O = object> = {
  services: IServiceArgs;
  message: T;
  botDbId: string;
} & O;

@Injectable()
export class BotEventsService {
  constructor(
    private readonly botStateService: BotStateService,
    private readonly botRepositoryService: BotRepositoryService,
    private readonly answersRepositoryService: AnswersRepositoryService,
    private readonly spamRepositoryService: SpamRepositoryService,
    private readonly scenarioRepositoryService: ScenarioRepositoryService,
    private readonly groupsRepositoryService: GroupsRepositoryService,
    private readonly globalLogService: GlobalLogService
  ) {}

  async botsMessagesReducer(message: TProcessMessages, botDbId: string) {
    const botState = this.botStateService
      .getBotStates()
      .find((botState) => botState.bot.botDbId === botDbId);

    const services: IServiceArgs = {
      botStateService: this.botStateService,
      botRepositoryService: this.botRepositoryService,
      answersRepositoryService: this.answersRepositoryService,
      spamRepositoryService: this.spamRepositoryService,
      scenarioRepositoryService: this.scenarioRepositoryService,
      groupsRepositoryService: this.groupsRepositoryService,
      globalLogService: this.globalLogService,
      l,
    };
    if (botState) {
      if (message.event_type in combinedListeners) {
        const res = await combinedListeners[message.event_type]({
          services,
          message,
          botDbId,
        });
        /*
        {
        'event_type': (message: TProcessMessages, botDbId: string) => Promise<any>;
        'event_type': (message: TProcessMessages, botDbId: string) => Promise<any>;
        }
        */
        if (res && "event_type" in res) {
          // TODO: fix this any
          if (message.response_types.includes(res.event_type as any)) {
            botState.childProcess.send(res);
          }
        }
      }
    }
  }
}
