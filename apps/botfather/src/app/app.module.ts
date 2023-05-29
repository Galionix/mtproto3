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
import { BotEntity, AnswerEntity, StatisticEntity } from "@core/types/server";
import { DatabaseModule } from "../database/database.module";
import { MulterModule } from "@nestjs/platform-express";

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
        database: config.get<string>("TYPEORM_DATABASE"),
        entities: [BotEntity, AnswerEntity, StatisticEntity],
        synchronize: true,
        // playground: true,
        // dropSchema: true,
        autoLoadEntities: true,
        // logging: true,
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      playground: true,
      plugins: [
        ApolloServerPluginCacheControl({ defaultMaxAge: 5 }), // optional
        responseCachePlugin(),
      ],
    }),
    DatabaseModule,
    BotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
