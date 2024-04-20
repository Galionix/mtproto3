import { Module } from "@nestjs/common";
import { GroupsRepositoryService } from "./groups-repository.service";
import { GroupsRepositoryResolver } from "./groups-repository.resolver";

@Module({
  providers: [GroupsRepositoryResolver, GroupsRepositoryService],
})
export class GroupsRepositoryModule {}
