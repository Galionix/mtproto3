import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotResolver } from "./bot.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BotEntity } from "./entities/bot.entity";
import { BotRepositoryService } from "../bot-repository-service/bot-repository.service";
import { BotProcessService } from "../bot-process-service/bot-process.service";
import { BotStateService } from "../bot-state-service/bot-state.service";
import { BotEventsService } from "../bot-events-messaging-service/bot-events.service";
import { SettingsService } from "../bot-events-messaging-service/settings-service/settings.service";

@Module({
  imports: [TypeOrmModule.forFeature([BotEntity])],
  providers: [
    BotResolver,
    BotService,
    BotRepositoryService,
    BotStateService,
    BotProcessService,
    BotEventsService,
    SettingsService,
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
