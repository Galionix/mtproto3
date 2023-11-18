import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseResolver } from "./answers-repository.resolver";
import { DatabaseService } from "./database.service";

describe("DatabaseResolver", () => {
  let resolver: DatabaseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseResolver, DatabaseService],
    }).compile();

    resolver = module.get<DatabaseResolver>(DatabaseResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
