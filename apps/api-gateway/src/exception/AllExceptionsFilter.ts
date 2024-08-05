import { HttpException, HttpStatus } from '@nestjs/common';

export class AllExceptionFilter extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
