import { Module } from "@nestjs/common";
import { MessagesRepositoryService } from "./messages-repository.service";
import { MessagesRepositoryResolver } from "./messages-repository.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageEntity } from "@core/types/server";

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [MessagesRepositoryResolver, MessagesRepositoryService],
})
export class MessagesRepositoryModule {}
