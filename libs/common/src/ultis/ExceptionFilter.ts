import { ArgumentsHost, Catch, ExceptionFilter, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { Observable, throwError } from 'rxjs';

type ErrorResponse = {
  statusCode: number | null;
  message: string | null;
  error: string | null;
  timestamp: string | null;
  path: string | null;
}

class AppError extends Error {
  statusCode: number | null;
  message: string | null;
  error: string | null;
  timestamp: string | null;
  path: string | null;
}

@Catch()
export class MicroserviceExceptionFilter implements RpcExceptionFilter<any> {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToRpc();
    const data = ctx.getData(); // Access the RPC request data if needed

    console.log("Ex: " + exception);

    const errorResponse: ErrorResponse = {
      statusCode: 400,
      message: exception.message || 'Internal server error',
      error: 'InternalException',
      timestamp: new Date().toISOString(),
      path: host.getArgByIndex(0).url, // Access the RPC path if needed
    };

    // Log the exception or send it to an external monitoring service
    console.error('RPC Exception:', errorResponse);

    // Return the error response wrapped in an observable
    return throwError(() => new RpcException(JSON.stringify(errorResponse)));
  }
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log('Ẽx: ' + JSON.stringify(exception));

    let errorResponse: ErrorResponse = {
      statusCode: 500,
      message: 'Internal server error',
      error: 'InternalServerException',
      timestamp: new Date().toISOString(),
      path: null,
    }

    if (exception instanceof RpcException) {
      const rpcErrorResponse = exception.getError()
      if (typeof rpcErrorResponse == 'string') {
        errorResponse.message = rpcErrorResponse;
      } else {
        const err = errorResponse as ErrorResponse;
        errorResponse = err;
      }
    } else if (exception instanceof Error) {
      if (exception['details']) {
        errorResponse = JSON.parse(exception['details'])
      } else {
      errorResponse.message = exception.message;
      }
    }

    // Log the exception or send it to an external monitoring service
    console.error('Exception:', errorResponse);

    response.status(errorResponse.statusCode).json(errorResponse);

    // Return the error response wrapped in an observable
    // return throwError(() => new Error(JSON.stringify(errorResponse)));
  }
}