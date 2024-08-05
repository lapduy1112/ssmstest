import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApishipService } from './apiship.service';
import { CreateShipRequest, UpdateShipRequest } from '@app/common';

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
  findOne(@Param('id') id: string) {
    console.log('ok', id);
    return this.apishipService.findOne(Number(id));
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
