import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { DefaultError } from '../../../../@shared/error/default.error';

const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';

function stringifyError(errors: string[]): string {
  const capitalizedErrors = errors.map(value => value.charAt(0).toUpperCase() + value.slice(1));
  return capitalizedErrors.join(', '); 
}

@Injectable()
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = INTERNAL_SERVER_ERROR_MESSAGE;

    if (exception instanceof DefaultError) {
      statusCode = exception.getStatusCode();
      message = exception.message;
    }

    if (exception instanceof ForbiddenException) {
      statusCode = exception.getStatus();
      message = exception.message;
    }

    if (exception instanceof BadRequestException) {
      statusCode = exception.getStatus();
      message = stringifyError(exception.getResponse()['message'])
    }

    console.error(exception);
    
    response.status(statusCode).json({
      statusCode,
      message,
      error: exception.name,
      path: request.url,
    });
  }
}
