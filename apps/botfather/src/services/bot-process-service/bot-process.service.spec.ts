import { Test, TestingModule } from "@nestjs/testing";
import { BotProcessService } from "./bot-process.service";

describe("BotProcessService", () => {
  let service: BotProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotProcessService],
    }).compile();

    service = module.get<BotProcessService>(BotProcessService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
