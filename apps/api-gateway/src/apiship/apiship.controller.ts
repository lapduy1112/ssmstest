import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApishipService } from './apiship.service';
import { CreateShipRequest, UpdateShipRequest } from '@app/common';
import { catchError } from 'rxjs';

@Controller('apiship')
export class ApishipController {
  constructor(private readonly apishipService: ApishipService) {}

  @Post()
  create(@Body() createApishipDto: CreateShipRequest) {
    return this.apishipService.create(createApishipDto);
  }

  @Get()
  findAll() {
    return this.apishipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.apishipService.findOne(id);
  //   return new Promise((resolve, reject) => {
  //     this.apishipService.findOne(Number(id)).subscribe({
  //     next: (result) => {
  //       if (result.error) {
  //         // Handle the error from the microservice response
  //         reject(
  //           new HttpException(result.error, HttpStatus.BAD_REQUEST)
  //         );
  //       } else {
  //         resolve(result);
  //       }
  //     },
  //     error: (err) => {
  //       // Handle errors that occur during the gRPC call
  //       reject(
  //         new HttpException(
  //           err.message || 'Internal Server Error',
  //           HttpStatus.INTERNAL_SERVER_ERROR,
  //         )
  //       );
  //     },
  //   });
  // });
}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShipRequest: UpdateShipRequest,
  ) {
    return this.apishipService.update(+id, updateShipRequest);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apishipService.remove(+id);
  }
}
