import { Module } from '@nestjs/common';
import { ShipModule } from './ship/ship.module';
import { ShipService } from './ship/ship.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ship } from 'apps/api-ship/src/ship/entities/ship.entity';
@Module({
  imports: [ShipModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 54320,
      username: 'postgres',
      password: 'postgres',
      database: 'ssmsbe',
      entities: [Ship],
      synchronize: true,
    }),],
  controllers: [],
  providers: [],
})
export class ApiShipModule {}
