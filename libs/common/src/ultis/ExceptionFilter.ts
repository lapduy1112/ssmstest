import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class MicroServiceExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException): Observable<any> {
    const micro_service_Response = exception.getError();
    const error = (micro_service_Response as { error }).error;
    return throwError(() => msCustomError(error));
  }
}

export interface IRpcException {
  message: string;
  statusCode: number;
}
function msCustomError(error: IRpcException): IRpcException {
  return {
    statusCode: error.statusCode,
    message: error.message,
  };
}
