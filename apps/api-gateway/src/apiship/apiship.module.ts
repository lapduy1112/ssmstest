import { Module } from '@nestjs/common';
import { ApishipService } from './apiship.service';
import { ApishipController } from './apiship.controller';

@Module({
  imports: [],
  controllers: [ApishipController],
  providers: [ApishipService],
})
export class ApishipModule {}
