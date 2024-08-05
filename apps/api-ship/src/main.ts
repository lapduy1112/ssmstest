import { NestFactory } from '@nestjs/core';
import { ApiShipModule } from './apiship.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SHIP_PACKAGE_NAME } from '@app/common';
import { MicroServiceExceptionFilter } from '@app/common/ultis/ExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ApiShipModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../../ship.proto'),
        package: SHIP_PACKAGE_NAME,
      },
    },
  );
  app.useGlobalFilters(new MicroServiceExceptionFilter());
  await app.listen();
}
bootstrap();
