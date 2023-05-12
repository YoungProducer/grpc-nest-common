import {
  ArgumentsHost,
  Catch,
  RpcExceptionFilter as RpcFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class RpcExceptionFilter implements RpcFilter<RpcException> {
  catch(exception: RpcException, _host: ArgumentsHost): Observable<any> {
    const rpcError = exception.getError();

    const error =
      typeof rpcError === 'string'
        ? {
            status: 'error',
            message: rpcError,
          }
        : rpcError;

    return throwError(() => error);
  }
}
