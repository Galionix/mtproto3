/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { BotProcessService } from "./bot-process-service/bot-process.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.API_PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://${process.env.API_HOST}:${port}/${globalPrefix}`
  );

  if (process.env.AUTOSTART === "true") {
    Logger.log(`🚀 Autostart enabled`);
    const botProcessService = app.get(BotProcessService);
    botProcessService.startBots();
  }
}

bootstrap();
