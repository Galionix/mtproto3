import { Test, TestingModule } from "@nestjs/testing";
import { GroupsRepositoryResolver } from "./groups-repository.resolver";
import { GroupsRepositoryService } from "./groups-repository.service";

describe("GroupsRepositoryResolver", () => {
  let resolver: GroupsRepositoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsRepositoryResolver, GroupsRepositoryService],
    }).compile();

    resolver = module.get<GroupsRepositoryResolver>(GroupsRepositoryResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
