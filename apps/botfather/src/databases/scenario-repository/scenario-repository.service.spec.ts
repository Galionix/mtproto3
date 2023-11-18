import { Test, TestingModule } from "@nestjs/testing";
import { ScenarioRepositoryService } from "./scenario-repository.service";

describe("ScenarioRepositoryService", () => {
  let service: ScenarioRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScenarioRepositoryService],
    }).compile();

    service = module.get<ScenarioRepositoryService>(ScenarioRepositoryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
