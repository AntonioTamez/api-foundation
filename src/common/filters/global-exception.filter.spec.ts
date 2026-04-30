import { GlobalExceptionFilter } from './global-exception.filter';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

describe('GlobalExceptionFilter', () => {
  let filter: GlobalExceptionFilter;
  let mockResponse: Partial<Response>;
  let mockArgumentsHost: Partial<ArgumentsHost>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };

    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue(mockResponse),
      }),
    };

    filter = new GlobalExceptionFilter();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('HttpException handling', () => {
    it('should handle HttpException with string message', () => {
      const exception = new HttpException('Test error', HttpStatus.BAD_REQUEST);
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(statusMock).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(jsonMock).toHaveBeenCalledWith({
        error: {
          code: 'BAD_REQUEST',
          message: 'Test error',
          details: {},
        },
      });
    });

    it('should handle HttpException with object response containing code', () => {
      const exception = new HttpException(
        { code: 'CUSTOM_ERROR', message: 'Custom error message', details: { field: 'test' } },
        HttpStatus.BAD_REQUEST,
      );
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(statusMock).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(jsonMock).toHaveBeenCalledWith({
        error: {
          code: 'CUSTOM_ERROR',
          message: 'Custom error message',
          details: { field: 'test' },
        },
      });
    });

    it('should handle HttpException with array messages', () => {
      const exception = new HttpException(
        { message: ['field1 is required', 'field2 is required'] },
        HttpStatus.BAD_REQUEST,
      );
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(statusMock).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(jsonMock).toHaveBeenCalledWith({
        error: {
          code: 'BAD_REQUEST',
          message: 'field1 is required, field2 is required',
          details: { messages: ['field1 is required', 'field2 is required'] },
        },
      });
    });

    it('should handle NotFoundException (404)', () => {
      const exception = new HttpException('Resource not found', HttpStatus.NOT_FOUND);
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(statusMock).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(jsonMock).toHaveBeenCalledWith({
        error: {
          code: 'NOT_FOUND',
          message: 'Resource not found',
          details: {},
        },
      });
    });

    it('should handle ValidationException (422)', () => {
      const exception = new HttpException(
        { code: 'VALIDATION_ERROR', message: 'Validation failed', details: { errors: [] } },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(statusMock).toHaveBeenCalledWith(HttpStatus.UNPROCESSABLE_ENTITY);
      expect(jsonMock).toHaveBeenCalledWith({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: { errors: [] },
        },
      });
    });
  });

  describe('Non-HttpException handling', () => {
    it('should handle generic Error', () => {
      const exception = new Error('Something went wrong');
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(statusMock).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(jsonMock).toHaveBeenCalledWith({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Something went wrong',
          details: {},
        },
      });
    });

    it('should handle unknown exceptions', () => {
      const exception = 'string error';
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(statusMock).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(jsonMock).toHaveBeenCalledWith({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
          details: {},
        },
      });
    });
  });

  describe('Status code mapping', () => {
    it('should map 400 to BAD_REQUEST code', () => {
      const exception = new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({ code: 'BAD_REQUEST' }),
        }),
      );
    });

    it('should map 401 to UNAUTHORIZED code', () => {
      const exception = new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({ code: 'UNAUTHORIZED' }),
        }),
      );
    });

    it('should map 403 to FORBIDDEN code', () => {
      const exception = new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({ code: 'FORBIDDEN' }),
        }),
      );
    });

    it('should map 404 to NOT_FOUND code', () => {
      const exception = new HttpException('Not found', HttpStatus.NOT_FOUND);
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({ code: 'NOT_FOUND' }),
        }),
      );
    });

    it('should map 409 to CONFLICT code', () => {
      const exception = new HttpException('Conflict', HttpStatus.CONFLICT);
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({ code: 'CONFLICT' }),
        }),
      );
    });

    it('should map 500 to INTERNAL_ERROR code', () => {
      const exception = new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({ code: 'INTERNAL_ERROR' }),
        }),
      );
    });
  });

  describe('Production mode', () => {
    const originalEnv = process.env.NODE_ENV;

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
    });

    it('should hide details in production for 500 errors', () => {
      process.env.NODE_ENV = 'production';
      filter = new GlobalExceptionFilter();

      const exception = new Error('Sensitive error details');
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(jsonMock).toHaveBeenCalledWith({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
          details: {},
        },
      });
    });

    it('should preserve details in development for 500 errors', () => {
      process.env.NODE_ENV = 'development';
      filter = new GlobalExceptionFilter();

      const exception = new Error('Sensitive error details');
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      expect(jsonMock).toHaveBeenCalledWith({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Sensitive error details',
          details: {},
        },
      });
    });
  });

  describe('Response format', () => {
    it('should always return error object with code, message, details', () => {
      const exception = new HttpException('Test', HttpStatus.BAD_REQUEST);
      filter.catch(exception, mockArgumentsHost as ArgumentsHost);

      const calledWith = jsonMock.mock.calls[0][0];
      expect(calledWith).toHaveProperty('error');
      expect(calledWith.error).toHaveProperty('code');
      expect(calledWith.error).toHaveProperty('message');
      expect(calledWith.error).toHaveProperty('details');
      expect(typeof calledWith.error.code).toBe('string');
      expect(typeof calledWith.error.message).toBe('string');
      expect(typeof calledWith.error.details).toBe('object');
    });
  });
});
