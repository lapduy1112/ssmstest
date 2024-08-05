import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import { Ship } from './entities/ship.entity';
import {
  CreateShipRequest,
  DeleteShipResponse,
  ListShipsResponse,
  ShipResponse,
  UpdateShipRequest,
} from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ShipService {
  constructor(
    @InjectRepository(Ship)
    private shipRepository: Repository<Ship>,
  ) {}

  async create(createShipRequest: CreateShipRequest): Promise<ShipResponse> {
    const newShip = {
      name: createShipRequest.name,
      capacity: createShipRequest.capacity,
      status: createShipRequest.status,
    };
    const savedShip = await this.shipRepository.save(newShip);
    const response: ShipResponse = {
      ship: savedShip,
    };
    console.log(response);
    return response;
  }

  async findAll(): Promise<ListShipsResponse> {
    const ships: Ship[] = await this.shipRepository.find();
    return { ships };
  }

  async FindShip(id: number) {
    const ship: Ship = await this.shipRepository.findOne({ where: { id } });
    if (!ship) {
      // throw new HttpException('Ship not found', HttpStatus.NOT_FOUND);
      throw new RpcException({
        statusCode: 404,
        message: 'Ship not found1',
      });
    }
    console.log('No ship found');
    return { ship };
  }

  async update(
    id: number,
    updateShipRequest: UpdateShipRequest,
  ): Promise<ShipResponse> {
    const updatedShip = {
      id: id,
      name: updateShipRequest.name,
      capacity: updateShipRequest.capacity,
      status: updateShipRequest.status,
    };
    const savedShip = await this.shipRepository.save(updatedShip);
    const response: ShipResponse = {
      ship: savedShip,
    };
    return response;
  }

  async remove(id: number): Promise<DeleteShipResponse> {
    const ship = await this.shipRepository.findOne({ where: { id } });
    if (!ship) {
      throw new NotFoundException(`cannot find ship ${id}`);
    }
    await this.shipRepository.remove(ship);
    const response: DeleteShipResponse = {
      message: 'Delete success',
    };
    return response;
  }
}
