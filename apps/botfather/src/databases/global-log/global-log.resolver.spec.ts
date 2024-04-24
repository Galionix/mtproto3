import { Test, TestingModule } from '@nestjs/testing';
import { GlobalLogResolver } from './global-log.resolver';
import { GlobalLogService } from './global-log.service';

describe('GlobalLogResolver', () => {
  let resolver: GlobalLogResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalLogResolver, GlobalLogService],
    }).compile();

    resolver = module.get<GlobalLogResolver>(GlobalLogResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
