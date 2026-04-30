import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from '../interfaces/error-response.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const isProduction = process.env.NODE_ENV === 'production';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'INTERNAL_ERROR';
    let message = 'An unexpected error occurred';
    let details: Record<string, unknown> = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null && !Array.isArray(exceptionResponse) && !(exceptionResponse instanceof Date) && !(exceptionResponse instanceof RegExp)) {
        const resp = exceptionResponse as Record<string, unknown>;
        code = (resp.code as string) || this.mapStatusToCode(status);
        message = (resp.message as string) || exception.message || this.getDefaultMessage(status);

        if (typeof resp.details === 'object' && resp.details !== null) {
          details = resp.details as Record<string, unknown>;
        } else if (Array.isArray(resp.message)) {
          details = { messages: resp.message };
          message = resp.message.filter(m => typeof m === 'string').join(', ') || message;
        }
      } else if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        code = this.mapStatusToCode(status);
      }
    } else if (exception instanceof Error) {
      message = exception.message || message;
      this.logger.error(`Unhandled exception: ${message}`, exception.stack);
    } else if (exception instanceof Error) {
      message = exception.message || message;
      this.logger.error(`Unhandled exception: ${message}`, exception.stack);
    } else if (exception !== null) {
      this.logger.error(`Unknown exception type: ${String(exception)}`);
    } else {
      this.logger.error('Unknown exception type: null');
    }

    const errorResponse: ErrorResponse = {
      error: {
        code,
        message,
        details: isProduction && status >= 500 ? {} : details,
      },
    };

    if (isProduction && status >= 500) {
      errorResponse.error.message = 'An unexpected error occurred';
      errorResponse.error.details = {};
    }

    response.status(status).json(errorResponse);
  }

  private mapStatusToCode(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'BAD_REQUEST';
      case HttpStatus.UNAUTHORIZED:
        return 'UNAUTHORIZED';
      case HttpStatus.FORBIDDEN:
        return 'FORBIDDEN';
      case HttpStatus.NOT_FOUND:
        return 'NOT_FOUND';
      case HttpStatus.CONFLICT:
        return 'CONFLICT';
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return 'VALIDATION_ERROR';
      default:
        return 'INTERNAL_ERROR';
    }
  }

  private getDefaultMessage(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'Bad request';
      case HttpStatus.UNAUTHORIZED:
        return 'Unauthorized';
      case HttpStatus.FORBIDDEN:
        return 'Forbidden';
      case HttpStatus.NOT_FOUND:
        return 'Resource not found';
      case HttpStatus.CONFLICT:
        return 'Resource conflict';
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return 'Validation failed';
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return 'An unexpected error occurred';
      default:
        return 'An error occurred';
    }
  }
}
