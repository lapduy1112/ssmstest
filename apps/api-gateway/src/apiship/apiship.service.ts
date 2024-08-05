import {
  CreateShipRequest,
  ShipServiceClient,
  UpdateShipRequest,
} from '@app/common';
import {
  Injectable,
  Inject,
  OnModuleInit,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Client, ClientGrpc, RpcException } from '@nestjs/microservices';
import { SHIP_SERVICE } from 'apps/api-gateway/src/apiship/constants';
import { SHIPPACKAGE } from './client';

@Injectable()
export class ApishipService implements OnModuleInit {
  private shipService: ShipServiceClient;

  @Client(SHIPPACKAGE)
  private readonly client: ClientGrpc;
  // constructor(@Inject(SHIP_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.shipService = this.client.getService<ShipServiceClient>('ShipService'); //no plain text in ship.proto -> line 5
  }

  create(createShipRequest: CreateShipRequest) {
    return this.shipService.createShip(createShipRequest);
  }

  findAll() {
    return this.shipService.listShips({});
  }

  findOne(id: number) {
    const ship = this.shipService.findShip({ id });
    return ship;
  }

  update(id: number, updateShipRequest: UpdateShipRequest) {
    return this.shipService.updateShip({ id, ...updateShipRequest });
  }

  remove(id: number) {
    return this.shipService.deleteShip({ id });
  }
}
