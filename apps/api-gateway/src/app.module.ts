import { Module } from '@nestjs/common';
import { ApishipModule } from './apiship/apiship.module';

import { ApishipService } from 'apps/api-gateway/src/apiship/apiship.service';
@Module({
  imports: [ApishipModule],
  controllers: [],
  providers: [ApishipService],
})
export class AppModule {}
