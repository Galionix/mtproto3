/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { BotProcessService } from "./services/bot-process-service/bot-process.service";
import { firebaseApp } from "./firestore";
import { getStorage } from "firebase/storage";
// import { storage } from "./firestore";

// const storage = getStorage(firebaseApp);
// console.log("storage: ", storage);
// console.log(storage);
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      preflightContinue: false,
      optionsSuccessStatus: 204,
      // credentials: true,
    },
  });

  const globalPrefix = "api/v1";

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.API_PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://${process.env.API_HOST}:${port}/${globalPrefix}`
  );

  if (process.env.AUTOSTART_BOTS === "true") {
    Logger.log(`🚀 Autostart enabled`);
    const botProcessService = app.get(BotProcessService);
    botProcessService.startBots();
  }
}

bootstrap();
