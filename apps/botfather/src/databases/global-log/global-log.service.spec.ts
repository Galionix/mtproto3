import { Test, TestingModule } from '@nestjs/testing';
import { GlobalLogService } from './global-log.service';

describe('GlobalLogService', () => {
  let service: GlobalLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalLogService],
    }).compile();

    service = module.get<GlobalLogService>(GlobalLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
