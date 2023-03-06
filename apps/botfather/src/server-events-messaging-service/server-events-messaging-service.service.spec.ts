import { Test, TestingModule } from "@nestjs/testing";
import { ServerEventsMessagingServiceService } from "./server-events-messaging-service.service";

describe("ServerEventsMessagingServiceService", () => {
  let service: ServerEventsMessagingServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerEventsMessagingServiceService],
    }).compile();

    service = module.get<ServerEventsMessagingServiceService>(
      ServerEventsMessagingServiceService
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
