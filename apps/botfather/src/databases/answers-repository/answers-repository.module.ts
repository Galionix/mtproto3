import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  AnswerEntity,
  // AnswerMessageEntity,
  MessageEntity,
} from "@core/types/server";
import { AnswersRepositoryResolver } from "./answers-repository.resolver";
import { AnswersRepositoryService } from "./answers-repository.service";
import { MessagesRepositoryService } from "../messages-repository/messages-repository.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AnswerEntity,
      // AnswerMessageEntity,
      MessageEntity,
    ]),
  ],

  providers: [
    AnswersRepositoryResolver,
    AnswersRepositoryService,
    MessagesRepositoryService,
  ],
  exports: [AnswersRepositoryService],
})
export class AnswersRepositoryModule {}
