import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpamRepositoryResolver } from "./spam-database.resolver";
import { MessageEntity } from "@core/types/server";
import { SpamRepositoryService } from "./spam-repository.service";

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],

  providers: [
    SpamRepositoryResolver,
    SpamRepositoryService,
  ],
  exports: [SpamRepositoryService],
})
export class SpamMessageModule {}
