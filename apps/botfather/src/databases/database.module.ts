import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { DatabaseResolver } from "./database.resolver";
import { DatabaseRepositoryService } from "./database-repository/database-repository.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnswerEntity } from "@core/types/server";

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity])],

  providers: [DatabaseResolver, DatabaseService, DatabaseRepositoryService],
  exports: [DatabaseService, DatabaseRepositoryService],
})
export class DatabaseModule {}
