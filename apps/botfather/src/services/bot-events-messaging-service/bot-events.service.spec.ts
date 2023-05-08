import { Test, TestingModule } from "@nestjs/testing";
import { BotEventsService } from "./bot-events.service";

describe("BotMessageService", () => {
  let service: BotEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotEventsService],
    }).compile();

    service = module.get<BotEventsService>(BotEventsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
