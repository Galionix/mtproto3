import { Module } from "@nestjs/common";
import { GlobalLogService } from "./global-log.service";
import { GlobalLogResolver } from "./global-log.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GlobalLogEntity } from "@core/types/server";

@Module({
  imports: [TypeOrmModule.forFeature([GlobalLogEntity])],
  providers: [GlobalLogResolver, GlobalLogService],
})
export class GlobalLogModule {}
