import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { ShipService } from './ship.service';
import { CreateShipRequest, UpdateShipRequest } from '@app/common';
import { status } from '@grpc/grpc-js';

@Controller()
export class ShipController {
  constructor(private readonly shipService: ShipService) {}

  @GrpcMethod('ShipService', 'CreateShip')
  createShip(data: CreateShipRequest) {
    return this.shipService.create(data);
  }

  @GrpcMethod('ShipService', 'UpdateShip')
  updateShip(data: UpdateShipRequest) {
    return this.shipService.update(data.id, data);
  }

  @GrpcMethod('ShipService', 'DeleteShip')
  deleteShip(data: { id: number }): unknown {
    return this.shipService.remove(data.id);
  }

  @GrpcMethod('ShipService', 'ListShips')
  listShips() {
    return this.shipService.findAll();
  }

  @GrpcMethod('ShipService', 'FindShip')
  async findShip(data: { id: number }) {
    return this.shipService.FindShip(data.id);
  }
}
