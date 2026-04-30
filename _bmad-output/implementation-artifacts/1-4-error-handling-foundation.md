# Story 1.4: Error Handling Foundation

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want global exception handling configured,
so that all errors return consistent JSON format.

## Acceptance Criteria

1. **AC1: Global Exception Filter**
   - **Given** the project is initialized
   - **When** I set up the global exception filter
   - **Then** all unhandled exceptions return `{ error: { code, message, details } }`
   - **And** HttpException errors are properly handled

2. **AC2: HTTP Status Codes**
   - **Given** the exception filter is set up
   - **When** an error occurs
   - **Then** the response includes appropriate HTTP status codes

## Tasks / Subtasks

- [x] Task 1 (AC: 1)
  - [x] Subtask 1.1: Review existing GlobalExceptionFilter in src/common/filters/
  - [x] Subtask 1.2: Enhance filter to handle all exception types with structured JSON output
  - [x] Subtask 1.3: Ensure HttpException responses include code, message, details
  - [x] Subtask 1.4: Add handling for unexpected errors (non-HttpException)
- [x] Task 2 (AC: 2)
  - [x] Subtask 2.1: Map exception types to appropriate HTTP status codes
  - [x] Subtask 2.2: Create custom exception classes for business errors
  - [x] Subtask 2.3: Verify proper status codes for 400, 404, 500 series errors
- [x] Task 3 (AC: 1, 2)
  - [x] Subtask 3.1: Write unit tests for exception filter
  - [x] Subtask 3.2: Test error responses for each exception type
  - [x] Subtask 3.3: Verify no internal details leaked in production

## Dev Notes

### Technical Stack

- **Runtime:** Node.js 20+ LTS
- **Language:** TypeScript 5.x with strict mode
- **Framework:** NestJS 10.x
- **Database:** SQLite (MVP), file-based storage
- **Architecture:** Clean Architecture (Controllers → Services → Repositories → DTOs)

### Error Response Format

From `architecture.md#Error Handling`:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

### Source: architecture.md#Communication Patterns

**Error Handling:**
- Global ExceptionFilter for unhandled errors
- HttpException for business errors
- ValidationPipe for DTO validation
- Logger for structured logging

**Process Patterns:**
1. All endpoints wrapped in try-catch
2. HttpException thrown for expected errors
3. Unexpected errors caught by global filter
4. Structured logging for all errors

### Source: architecture.md#HTTP Status Codes

- 200 OK - Success
- 201 Created - Resource created
- 400 Bad Request - Validation error
- 404 Not Found - Resource not found
- 500 Internal Server Error - Unexpected error

### Current Implementation Notes

After Story 1.3, the codebase has:
- `src/main.ts` - Bootstrap with graceful shutdown
- `src/app.module.ts` - Root module with TypeORM, GlobalExceptionFilter registered
- `src/config/configuration.ts` - Configuration with port parsing
- `src/common/filters/global-exception.filter.ts` - HTTP exception filter (EXISTING - must check current state)
- `src/modules/uuid/` - Sample module demonstrating Clean Architecture pattern
- `src/database/entities/url.entity.ts` - URL entity with TypeORM decorators

**Must preserve:**
- GlobalExceptionFilter registration in AppModule
- PORT env var handling in bootstrap
- Graceful shutdown implementation
- TypeORM configuration and Url entity
- Clean Architecture folder structure

### Testing Requirements

- Jest is NestJS default testing framework
- Coverage target: ≥ 80%
- Unit tests co-located with source (`*.spec.ts`)
- E2E tests in `test/` directory

### Error Code Conventions

Based on architecture requirements:
- `VALIDATION_ERROR` - Invalid input data
- `NOT_FOUND` - Resource not found
- `INTERNAL_ERROR` - Unexpected server errors
- `UNAUTHORIZED` - Authentication required (future)
- `FORBIDDEN` - Access denied (future)

### References

- [Source: architecture.md#Communication Patterns]
- [Source: architecture.md#Error Handling]
- [Source: architecture.md#Process Patterns]
- [Source: epics.md#Story 1.4]
- [Source: 1-3-database-configuration.md#Current Implementation Notes]

## Dev Agent Record

### Agent Model Used

MiniMax-M2.7

### Debug Log References

### Completion Notes List

- Reviewed existing GlobalExceptionFilter and enhanced it
- Added @Catch() to handle ALL exceptions (not just HttpException)
- Added ErrorResponse interface for structured JSON output
- Created BusinessException base class and custom exceptions (NotFoundException, ValidationException, InternalErrorException)
- Implemented code mapping from status codes to error codes
- Added production mode that hides details for 500 errors
- Added structured logging for unhandled exceptions
- Created comprehensive unit tests (28 tests passing)
- All tests pass, build passes, lint passes

### File List

- src/common/filters/global-exception.filter.ts (modified)
- src/common/filters/global-exception.filter.spec.ts (new)
- src/common/interfaces/error-response.interface.ts (new)
- src/common/exceptions/business.exceptions.ts (new)

## Change Log

- Initial implementation of Story 1.4: Error Handling Foundation (Date: 2026-04-29)
