import { Test, TestingModule } from "@nestjs/testing";
import { AnswersRepositoryService } from "./answers-repository.service";

describe("DatabaseRepositoryService", () => {
  let service: AnswersRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswersRepositoryService],
    }).compile();

    service = module.get<AnswersRepositoryService>(AnswersRepositoryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
