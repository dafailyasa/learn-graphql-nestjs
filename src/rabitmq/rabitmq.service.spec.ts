import { Test, TestingModule } from '@nestjs/testing';
import { RabitmqService } from './rabitmq.service';

describe('RabitmqService', () => {
  let service: RabitmqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabitmqService],
    }).compile();

    service = module.get<RabitmqService>(RabitmqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
