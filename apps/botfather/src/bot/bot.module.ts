import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotResolver } from "./bot.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BotEntity } from "./entities/bot.entity";
import { BotRepositoryService } from "../bot-repository-service/bot-repository.service";
import { BotMessageService } from "../bot-message-service/bot-message.service";
import { BotProcessService } from "../bot-process-service/bot-process.service";
import { BotStateService } from "../bot-state-service/bot-state.service";

@Module({
  imports: [TypeOrmModule.forFeature([BotEntity])],
  providers: [
    BotResolver,
    BotService,
    BotRepositoryService,
    BotStateService,
    BotProcessService,
    BotMessageService,
  ],
  exports: [BotService],
})
export class BotModule {}
