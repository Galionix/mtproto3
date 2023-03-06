import { Test, TestingModule } from "@nestjs/testing";
import { BotService } from "./bot.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { BotEntity } from "./entities/bot.entity";
// import { defaultBotState } from "./types/botState";
// import child_process from "child_process";
// import { Repository } from "typeorm";

// mock child_process module
jest.mock("child_process", () => ({
  fork: jest.fn(),
}));

const findAllMock = [
  {
    id: 1,
    api_id: "123",
    api_hash: "456",
    sessionString: "session",
  },
  {
    id: 2,
    api_id: "123",
    api_hash: "456",
    sessionString: "session",
  },
];
const mockBotRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn().mockResolvedValue([
    {
      id: 1,
      api_id: "123",
      api_hash: "456",
      sessionString: "session",
    },
  ]),
  findAll: jest.fn().mockResolvedValue(findAllMock),
};

describe("BotService", () => {
  let service: BotService;
  let botRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotService,
        {
          provide: getRepositoryToken(BotEntity),
          useValue: mockBotRepository,
          // useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BotService>(BotService);
    botRepository = module.get(getRepositoryToken(BotEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new bot if it does not exist", async () => {
      const createBotInput = {
        api_id: 123,
        api_hash: "456",
        sessionString: "session",
      };
      const botEntity = { id: 1, ...createBotInput };
      jest.spyOn(botRepository, "findOne").mockResolvedValueOnce(undefined);
      jest.spyOn(botRepository, "save").mockResolvedValueOnce(botEntity);
      const result = await service.create(createBotInput);
      expect(botRepository.findOne).toHaveBeenCalledWith({
        where: { api_id: 123 },
      });
      expect(botRepository.save).toHaveBeenCalledWith({
        id: expect.any(String),
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
      const mockBot = { id: "1", api_id: "123", sessionString: "session1" };
      // const mockBotState = { id: "1", isStarted: true };

      botRepository.findOne.mockResolvedValue(mockBot);
      // service.getBotState = jest.fn().mockReturnValue(mockBotState);

      const result = await service.findOne(mockBot.id);

      expect(result).toEqual(mockBot);
      expect(botRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockBot.id },
      });
    });
  });

  // describe("startBots", () => {
  //   it("should start all bots and return their login details", async () => {
  //     const bots = [
  //       {
  //         id: "1",
  //         api_id: "1234",
  //         api_hash: "abcd",
  //         sessionString: "dummy_session_string_1",
  //       },
  //       {
  //         id: "2",
  //         api_id: "5678",
  //         api_hash: "efgh",
  //         sessionString: "dummy_session_string_2",
  //       },
  //     ];
  //     botRepository.find.mockResolvedValue(bots);

  //     const childProcess = {
  //       on: jest.fn(),
  //       kill: jest.fn(),
  //     };
  //     // jest.spyOn(global, "setTimeout").mockImplementation((fn) => fn());

  //     // jest.spyOn("child_process", "fork").mockReturnValue(childProcess as any);

  //     const result = await service.startBots();

  //     // expect(child_process.fork).toHaveBeenCalledTimes(2);
  //     expect(result).toEqual(bots);
  //     // expect(global.setTimeout).toHaveBeenCalledTimes(2);
  //     // expect(global.fork).toHaveBeenCalledTimes(2);
  //     // expect(childProcess.on).toHaveBeenCalledTimes(2);
  //     // expect(childProcess.on).toHaveBeenCalledWith(
  //     //   "message",
  //     //   expect.any(Function)
  //     // );
  //     // expect(childProcess.on).toHaveBeenCalledWith(
  //     //   "error",
  //     //   expect.any(Function)
  //     // );
  //     // expect(service.getProcessesCount()).toBe(2);
  //   });
  // });
});
