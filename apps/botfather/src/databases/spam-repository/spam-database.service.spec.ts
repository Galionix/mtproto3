import { Test, TestingModule } from "@nestjs/testing";
import { SpamDatabaseService } from "./spam-database.service";

describe("SpamDatabaseService", () => {
  let service: SpamDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpamDatabaseService],
    }).compile();

    service = module.get<SpamDatabaseService>(SpamDatabaseService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
