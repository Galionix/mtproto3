import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnswerEntity } from "@core/types/server";
import { AnswersRepositoryResolver } from "./answers-repository.resolver";
import { AnswersRepositoryService } from "./answers-repository.service";

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity])],

  providers: [AnswersRepositoryResolver, AnswersRepositoryService],
  exports: [AnswersRepositoryService],
})
export class AnswersRepositoryModule {}
