import { Test, TestingModule } from "@nestjs/testing";
import { GroupsRepositoryService } from "./groups-repository.service";

describe("GroupsRepositoryService", () => {
  let service: GroupsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsRepositoryService],
    }).compile();

    service = module.get<GroupsRepositoryService>(GroupsRepositoryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
