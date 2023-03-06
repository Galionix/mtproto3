import { Test, TestingModule } from "@nestjs/testing";
import { BotMessageService } from "./bot-message.service";

describe("BotMessageService", () => {
  let service: BotMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotMessageService],
    }).compile();

    service = module.get<BotMessageService>(BotMessageService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
