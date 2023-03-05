import { Test, TestingModule } from "@nestjs/testing";
import { BotResolver } from "./bot.resolver";
import { BotService } from "./bot.service";

describe("BotResolver", () => {
  let resolver: BotResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotResolver, BotService],
    }).compile();

    resolver = module.get<BotResolver>(BotResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
