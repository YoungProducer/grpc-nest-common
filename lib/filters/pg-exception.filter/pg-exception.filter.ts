import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { DatabaseError } from 'pg';

import { parsers } from './parsers';

@Catch(QueryFailedError)
export class PGExceptionFilter implements ExceptionFilter<DatabaseError> {
  catch(exception: DatabaseError) {
    const parser = parsers.get(exception.code);

    const { error, httpStatus } = parser
      ? parser(exception.detail)
      : {
          error: exception.detail,
          httpStatus: HttpStatus.BAD_REQUEST,
        };

    return {
      status: httpStatus,
      error,
    };
  }
}
