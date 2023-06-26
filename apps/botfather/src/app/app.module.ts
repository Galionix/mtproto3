import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { ApolloServerPluginCacheControl } from "apollo-server-core/dist/plugin/cacheControl";
import responseCachePlugin from "apollo-server-plugin-response-cache";
import { BotModule } from "../bot/bot.module";
import {
  BotEntity,
  AnswerEntity,
  StatisticEntity,
  MessageEntity,
  ScenarioEntity,
  ScenarioBranchEntity,
  ScenarioChoiceEntity,
  // AnswerMessageEntity,
} from "@core/types/server";
import { AnswersRepositoryModule } from "../databases/answers-repository/answers-repository.module";
import { MulterModule } from "@nestjs/platform-express";
import { SpamMessageModule } from "../databases/spam-repository/spam-database.module";
import { MessagesRepositoryModule } from "../databases/messages-repository/messages-repository.module";
import { ScenarioRepositoryModule } from "../databases/scenario-repository/scenario-repository.module";

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        dest: config.get<string>("UPLOADS_PATH"),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   debug: false,
    //   playground: false,
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        // postgres because generic typeorm driver doesn't support Aurora Data API
        type: config.get<"postgres">("TYPEORM_CONNECTION"),
        host: config.get<string>("API_HOST"),
        port: config.get<number>("TYPEORM_PORT"),
        username: config.get<string>("TYPEORM_USERNAME"),
        password: config.get<string>("TYPEORM_PASSWORD"),
        // database: ":memory:",
        database: config.get<string>("TYPEORM_DATABASE"),
        entities: [
          BotEntity,
          AnswerEntity,
          // AnswerMessageEntity,
          StatisticEntity,
          MessageEntity,
          ScenarioEntity,
          ScenarioBranchEntity,
          ScenarioChoiceEntity,
        ],
        synchronize: true,
        // playground: true,
        // dropSchema: true,
        autoLoadEntities: true,
        // logging: true,
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "./apps/frontend/apollo/schema.gql"),
      sortSchema: true,
      playground: true,
      plugins: [
        ApolloServerPluginCacheControl({ defaultMaxAge: 5 }), // optional
        responseCachePlugin(),
      ],
    }),
    AnswersRepositoryModule,
    MessagesRepositoryModule,
    BotModule,
    SpamMessageModule,
    ScenarioRepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
