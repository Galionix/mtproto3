import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotResolver } from "./bot.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BotEntity, AnswerEntity, MessageEntity } from "@core/types/server";
import { BotProcessService } from "../services/bot-process-service/bot-process.service";
import { BotStateService } from "../services/bot-state-service/bot-state.service";
import { BotEventsService } from "../services/bot-events-messaging-service/bot-events.service";
import { BotRepositoryService } from "../services/bot-repository-service/bot-repository.service";
import { SettingsService } from "../services/settings-service/settings.service";
import { AnswersRepositoryService } from "../databases/answers-repository/answers-repository.service";
import { SpamRepositoryService } from "../databases/spam-repository/spam-repository.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([BotEntity, AnswerEntity, MessageEntity])
  ],
  providers: [
    BotResolver,
    BotService,
    BotRepositoryService,
    BotStateService,
    BotProcessService,
    BotEventsService,
    SettingsService,
    AnswersRepositoryService,
    SpamRepositoryService
  ],
  exports: [
    BotService,
    BotProcessService,
    SettingsService,
    BotStateService,
    BotRepositoryService,
  ],
})
export class BotModule {}
