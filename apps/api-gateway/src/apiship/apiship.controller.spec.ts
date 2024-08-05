import { Test, TestingModule } from '@nestjs/testing';
import { ApishipController } from './apiship.controller';
import { ApishipService } from './apiship.service';

describe('ApishipController', () => {
  let controller: ApishipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApishipController],
      providers: [ApishipService],
    }).compile();

    controller = module.get<ApishipController>(ApishipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
