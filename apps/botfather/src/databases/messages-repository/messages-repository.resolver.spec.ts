import { Test, TestingModule } from "@nestjs/testing";
import { MessagesRepositoryResolver } from "./messages-repository.resolver";
import { MessagesRepositoryService } from "./messages-repository.service";

describe("MessagesRepositoryResolver", () => {
  let resolver: MessagesRepositoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesRepositoryResolver, MessagesRepositoryService],
    }).compile();

    resolver = module.get<MessagesRepositoryResolver>(
      MessagesRepositoryResolver
    );
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
