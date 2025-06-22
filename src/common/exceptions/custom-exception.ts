import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodes, ErrorMessages, ErrorHttpStatus } from '../constants';

export interface ExceptionDetails {
  code: ErrorCodes;
  message?: string;
  details?: any;
  timestamp?: string;
  requestId?: string;
  userId?: string;
  context?: string;
}

export class CustomException extends HttpException {
  public readonly code: ErrorCodes;
  public readonly details: any;
  public readonly timestamp: string;
  public requestId?: string;
  public userId?: string;
  public readonly context?: string;

  constructor(details: ExceptionDetails) {
    const {
      code,
      message,
      details: exceptionDetails,
      timestamp,
      requestId,
      userId,
      context,
    } = details;

    const statusCode = ErrorHttpStatus[code];
    const errorMessage = message || ErrorMessages[code];

    const response = {
      success: false,
      code,
      message: errorMessage,
      statusCode,
      timestamp: timestamp || new Date().toISOString(),
      path: context,
      ...(requestId && { requestId }),
      ...(userId && { userId }),
      ...(exceptionDetails && { details: exceptionDetails }),
    };

    super(response, statusCode);

    this.code = code;
    this.details = exceptionDetails;
    this.timestamp = response.timestamp;
    this.requestId = requestId;
    this.userId = userId;
    this.context = context;
  }

  /**
   * Create a validation error exception
   */
  static validationError(message: string, details?: any, context?: string): CustomException {
    return new CustomException({
      code: ErrorCodes.VALIDATION_ERROR,
      message,
      details,
      context,
    });
  }

  /**
   * Create a not found exception
   */
  static notFound(resource: string, details?: any, context?: string): CustomException {
    return new CustomException({
      code: ErrorCodes.NOT_FOUND,
      message: `${resource} not found`,
      details,
      context,
    });
  }

  /**
   * Create a conflict exception
   */
  static conflict(message: string, details?: any, context?: string): CustomException {
    return new CustomException({
      code: ErrorCodes.CONFLICT,
      message,
      details,
      context,
    });
  }

  /**
   * Create an unauthorized exception
   */
  static unauthorized(message?: string, details?: any, context?: string): CustomException {
    return new CustomException({
      code: ErrorCodes.UNAUTHORIZED,
      message: message || ErrorMessages[ErrorCodes.UNAUTHORIZED],
      details,
      context,
    });
  }

  /**
   * Create a forbidden exception
   */
  static forbidden(message?: string, details?: any, context?: string): CustomException {
    return new CustomException({
      code: ErrorCodes.FORBIDDEN,
      message: message || ErrorMessages[ErrorCodes.FORBIDDEN],
      details,
      context,
    });
  }

  /**
   * Create a database error exception
   */
  static databaseError(message?: string, details?: any, context?: string): CustomException {
    return new CustomException({
      code: ErrorCodes.DATABASE_ERROR,
      message: message || ErrorMessages[ErrorCodes.DATABASE_ERROR],
      details,
      context,
    });
  }

  /**
   * Create an external service error exception
   */
  static externalServiceError(service: string, details?: any, context?: string): CustomException {
    return new CustomException({
      code: ErrorCodes.EXTERNAL_SERVICE_ERROR,
      message: `${service} service error`,
      details,
      context,
    });
  }

  /**
   * Create a rate limit exceeded exception
   */
  static rateLimitExceeded(details?: any, context?: string): CustomException {
    return new CustomException({
      code: ErrorCodes.RATE_LIMIT_EXCEEDED,
      details,
      context,
    });
  }

  /**
   * Create a business rule violation exception
   */
  static businessRuleViolation(rule: string, details?: any, context?: string): CustomException {
    return new CustomException({
      code: ErrorCodes.BAD_REQUEST,
      message: `Business rule violation: ${rule}`,
      details,
      context,
    });
  }

  /**
   * Create a wishlist-specific exception
   */
  static wishlistError(code: ErrorCodes, message?: string, details?: any, context?: string): CustomException {
    return new CustomException({
      code,
      message: message || ErrorMessages[code],
      details,
      context,
    });
  }

  /**
   * Get the response object
   */
  getResponse(): any {
    return {
      success: false,
      code: this.code,
      message: this.message,
      statusCode: this.getStatus(),
      timestamp: this.timestamp,
      path: this.context,
      ...(this.requestId && { requestId: this.requestId }),
      ...(this.userId && { userId: this.userId }),
      ...(this.details && { details: this.details }),
    };
  }

  /**
   * Add request context to the exception
   */
  withRequestContext(requestId: string, userId?: string): CustomException {
    this.requestId = requestId;
    if (userId) {
      this.userId = userId;
    }
    return this;
  }
} 