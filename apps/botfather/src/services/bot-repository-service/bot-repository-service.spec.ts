import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateBotInput } from "../bot/dto/create-bot.input";
import { BotEntity } from "../bot/entities/bot.entity";
import { BotRepositoryService } from "./bot-repository.service";

describe("BotRepositoryService", () => {
  let service: BotRepositoryService;
  let botRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotRepositoryService],
    }).compile();

    service = module.get<BotRepositoryService>(BotRepositoryService);
    botRepository = module.get(getRepositoryToken(BotEntity));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a new bot if it does not exist", async () => {
      const createBotInput: CreateBotInput = {
        api_id: 123,
        api_hash: "456",
        sessionString: "session",
      };
      const botEntity = createBotInput;
      jest.spyOn(botRepository, "findOne").mockResolvedValueOnce(undefined);
      jest.spyOn(botRepository, "save").mockResolvedValueOnce(botEntity);
      const result = await service.create(createBotInput);
      expect(service.findOne).toHaveBeenCalledWith({
        where: { api_id: 123 },
      });
      expect(botRepository.save).toHaveBeenCalledWith({
        // api_id: expect.any(String),
        ...createBotInput,
      });
      expect(result).toEqual(botEntity);
    });

    it("should return the existing bot if it already exists", async () => {
      const createBotInput = {
        api_id: 123,
        api_hash: "456",
        sessionString: "session",
      };
      const botEntity = { id: 1, ...createBotInput };
      jest.spyOn(botRepository, "findOne").mockResolvedValueOnce(botEntity);
      const result = await service.create(createBotInput);
      expect(botRepository.findOne).toHaveBeenCalledWith({
        where: { api_id: 123 },
      });
      expect(botRepository.save).not.toHaveBeenCalled();
      expect(result).toEqual(botEntity);
    });
  });

  describe("findAll", () => {
    it("should return an array of bots", async () => {
      const mockBots = [{ id: "1", api_id: "123", sessionString: "session1" }];
      const mockBotStates = [{ id: "1", isStarted: true }];

      botRepository.find.mockResolvedValue(mockBots);
      service.getBotState = jest.fn().mockReturnValue(mockBotStates[0]);

      const result = await service.findAll();

      expect(result).toEqual([mockBots[0]]);
      expect(botRepository.find).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a bot with its state", async () => {
      const mockBot = { api_id: 123, sessionString: "session1" };
      // const mockBotState = { id: "1", isStarted: true };

      botRepository.findOne.mockResolvedValue(mockBot);
      // service.getBotState = jest.fn().mockReturnValue(mockBotState);

      const result = await service.findOne(mockBot.api_id);

      expect(result).toEqual(mockBot);
      expect(botRepository.findOne).toHaveBeenCalledWith({
        where: { api_id: mockBot.api_id },
      });
    });
  });
});
