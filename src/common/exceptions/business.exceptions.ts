import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(
    public code: string,
    message: string,
    details: Record<string, unknown> = {},
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super({ code, message, details }, status);
  }
}

export class NotFoundException extends BusinessException {
  constructor(resource: string, identifier?: string) {
    super(
      'NOT_FOUND',
      `${resource}${identifier ? ` ${identifier}` : ''} not found`,
      { resource, identifier },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class ValidationException extends BusinessException {
  constructor(errors: Array<{ field: string; message: string }>) {
    super('VALIDATION_ERROR', 'Validation failed', { errors }, HttpStatus.BAD_REQUEST);
  }
}

export class InternalErrorException extends BusinessException {
  constructor(details: Record<string, unknown> = {}) {
    super('INTERNAL_ERROR', 'An unexpected error occurred', details, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
