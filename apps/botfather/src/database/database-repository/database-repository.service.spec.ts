import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseRepositoryService } from "./database-repository.service";

describe("DatabaseRepositoryService", () => {
  let service: DatabaseRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseRepositoryService],
    }).compile();

    service = module.get<DatabaseRepositoryService>(DatabaseRepositoryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
