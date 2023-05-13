import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, _host: ArgumentsHost) {
    const res = exception.getResponse() as any;

    const error = res.message;

    return {
      status: exception.getStatus(),
      error: Array.isArray(error) ? error[0] : error,
    };
  }
}
