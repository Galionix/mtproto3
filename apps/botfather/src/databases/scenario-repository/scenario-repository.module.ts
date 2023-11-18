import { Module } from "@nestjs/common";
import { ScenarioRepositoryService } from "./scenario-repository.service";
import { ScenarioRepositoryResolver } from "./scenario-repository.resolver";
import {
  AnswerEntity,
  // AnswerMessageEntity,
  MessageEntity,
  ScenarioBranchEntity,
  ScenarioEntity,
  // StoredAnswerEntity,
} from "@core/types/server";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnswersRepositoryService } from "../answers-repository/answers-repository.service";
import { MessagesRepositoryService } from "../messages-repository/messages-repository.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // StoredAnswerEntity,
      MessageEntity,
      // AnswerMessageEntity,
      ScenarioEntity,
      ScenarioBranchEntity,
      AnswerEntity,
    ]),
  ],
  providers: [
    ScenarioRepositoryResolver,
    ScenarioRepositoryService,
    AnswersRepositoryService,
    MessagesRepositoryService,
  ],
})
export class ScenarioRepositoryModule {}
