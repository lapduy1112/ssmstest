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
import { catchError, Observable, throwError } from 'rxjs';
import { s } from 'vite/dist/node/types.d-aGj9QkWt';

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

  findOne(id: number): Observable<any> {
    const ship = this.shipService.findShip({ id });
    // const ship = this.shipService.findShip({ id }).pipe(
    //   catchError((error) => {
    //     console.log(error);
    //     console.error('Error in gRPC call:', error.message);
    //     return throwError(() => new RpcException('Failed to add ship via gRPC microservice'));
    //   })
    // );;
    // console.log(ship.pipe())
    return ship;
  }

  update(id: number, updateShipRequest: UpdateShipRequest) {
    return this.shipService.updateShip({ id, ...updateShipRequest });
  }

  remove(id: number) {
    return this.shipService.deleteShip({ id });
  }
}
