import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotResolver } from "./bot.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BotEntity } from "./entities/bot.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BotEntity])],
  providers: [BotResolver, BotService],
  exports: [BotService],
})
export class BotModule {}
