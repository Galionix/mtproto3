import { Test, TestingModule } from "@nestjs/testing";
import { BotResolver } from "./bot.resolver";
import { BotService } from "./bot.service";
import { CreateBotInput } from "./dto/create-bot.input";
import { BotEntity } from "./entities/bot.entity";

describe("BotResolver", () => {
  let resolver: BotResolver;
  let service: BotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotResolver,
        {
          provide: BotService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<BotResolver>(BotResolver);
    service = module.get<BotService>(BotService);
  });

  describe("createBot", () => {
    it("should create a new bot", async () => {
      const createBotInput: CreateBotInput = {
        api_id: 123,
        api_hash: "456",
        sessionString: "session",
      };
      const botEntity: BotEntity = { id: "1", ...createBotInput };
      jest.spyOn(service, "create").mockResolvedValueOnce(botEntity);
      const result = await resolver.createBot(createBotInput);
      expect(service.create).toHaveBeenCalledWith(createBotInput);
      expect(result).toEqual(botEntity);
    });

    it("should return an existing bot if it already exists", async () => {
      const createBotInput: CreateBotInput = {
        api_id: 123,
        api_hash: "456",
        sessionString: "session",
      };

      const botEntity: BotEntity = { id: "1", ...createBotInput };
      jest.spyOn(service, "create").mockResolvedValueOnce(botEntity);
      const result = await resolver.createBot(createBotInput);
      expect(service.create).toHaveBeenCalledWith(createBotInput);
      expect(result).toEqual(botEntity);
    });
  });
});
