import { Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { DatabaseError } from 'pg';
import { Observable, throwError } from 'rxjs';

import { parsers } from './parsers';

@Catch(QueryFailedError)
export class PGExceptionFilter implements ExceptionFilter<DatabaseError> {
  catch(exception: DatabaseError): Observable<any> {
    const parser = parsers.get(exception.code);

    const error = parser ? parser(exception.detail) : exception.detail;

    return throwError(() => ({
      status: 'error',
      message: error,
    }));
  }
}
