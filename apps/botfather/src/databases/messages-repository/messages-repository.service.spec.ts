import { Test, TestingModule } from "@nestjs/testing";
import { MessagesRepositoryService } from "./messages-repository.service";

describe("MessagesRepositoryService", () => {
  let service: MessagesRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesRepositoryService],
    }).compile();

    service = module.get<MessagesRepositoryService>(MessagesRepositoryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
