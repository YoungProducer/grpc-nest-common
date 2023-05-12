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
    return throwError(() => exception.getError());
  }
}
