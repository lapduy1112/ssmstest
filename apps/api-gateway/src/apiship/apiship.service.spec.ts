import { Test, TestingModule } from '@nestjs/testing';
import { ApishipService } from './apiship.service';

describe('ApishipService', () => {
  let service: ApishipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApishipService],
    }).compile();

    service = module.get<ApishipService>(ApishipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
