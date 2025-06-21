import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiCommonResponses = {
  // Common success responses
  success: (description: string, type?: any) =>
    ApiResponse({
      status: 200,
      description,
      type,
    }),

  created: (description: string, type?: any) =>
    ApiResponse({
      status: 201,
      description,
      type,
    }),

  // Common error responses
  unauthorized: () =>
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Invalid or missing authentication token',
    }),

  forbidden: () =>
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
    }),

  notFound: (description: string = 'Resource not found') =>
    ApiResponse({
      status: 404,
      description,
    }),

  badRequest: (description: string = 'Bad request - Invalid input data') =>
    ApiResponse({
      status: 400,
      description,
    }),

  conflict: (description: string = 'Conflict - Resource already exists') =>
    ApiResponse({
      status: 409,
      description,
    }),

  internalServerError: () =>
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    }),

  // Combined decorators for common patterns
  withAuth: (successType?: any) =>
    applyDecorators(
      ApiCommonResponses.success('Operation completed successfully', successType),
      ApiCommonResponses.unauthorized(),
      ApiCommonResponses.notFound(),
    ),

  withAuthAndValidation: (successType?: any) =>
    applyDecorators(
      ApiCommonResponses.success('Operation completed successfully', successType),
      ApiCommonResponses.unauthorized(),
      ApiCommonResponses.badRequest(),
      ApiCommonResponses.notFound(),
    ),

  createWithAuth: (successType?: any) =>
    applyDecorators(
      ApiCommonResponses.created('Resource created successfully', successType),
      ApiCommonResponses.unauthorized(),
      ApiCommonResponses.badRequest(),
      ApiCommonResponses.conflict(),
    ),
}; 