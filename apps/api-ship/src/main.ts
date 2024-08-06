import { NestFactory } from '@nestjs/core';
import { ApiShipModule } from './apiship.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SHIP_PACKAGE_NAME } from '@app/common';
import { MicroserviceExceptionFilter } from '@app/common/ultis/ExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ApiShipModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../../ship.proto'),
        package: SHIP_PACKAGE_NAME,
        url: '127.0.0.1:5001'
      },
    },
  );
  app.useGlobalFilters(new MicroserviceExceptionFilter());
  await app.listen();
}
bootstrap();
