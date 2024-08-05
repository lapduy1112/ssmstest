import { SHIP_PACKAGE_NAME } from '@app/common';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const SHIPPACKAGE: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: SHIP_PACKAGE_NAME,
    protoPath: join(__dirname, '../../ship.proto'),
  },
};
