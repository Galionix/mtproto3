import { Test, TestingModule } from "@nestjs/testing";
import { ScenarioRepositoryResolver } from "./scenario-repository.resolver";
import { ScenarioRepositoryService } from "./scenario-repository.service";

describe("ScenarioRepositoryResolver", () => {
  let resolver: ScenarioRepositoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScenarioRepositoryResolver, ScenarioRepositoryService],
    }).compile();

    resolver = module.get<ScenarioRepositoryResolver>(
      ScenarioRepositoryResolver
    );
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
