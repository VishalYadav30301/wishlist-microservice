import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

/**
 * Utility functions for common Swagger patterns
 */
export class SwaggerUtils {
  /**
   * Creates a complete CRUD operation decorator set
   */
  static createCrudDecorators(resource: string, schema: any) {
    return {
      getAll: applyDecorators(
        ApiOperation({
          summary: `Get all ${resource}`,
          description: `Retrieve a list of all ${resource}`,
        }),
        ApiResponse({
          status: 200,
          description: `List of ${resource} retrieved successfully`,
          type: [schema],
        }),
        ApiResponse({
          status: 401,
          description: 'Unauthorized',
        }),
      ),

      getById: applyDecorators(
        ApiOperation({
          summary: `Get ${resource} by ID`,
          description: `Retrieve a specific ${resource} by its unique identifier`,
        }),
        ApiParam({
          name: 'id',
          description: `${resource} ID`,
          type: 'string',
        }),
        ApiResponse({
          status: 200,
          description: `${resource} retrieved successfully`,
          type: schema,
        }),
        ApiResponse({
          status: 401,
          description: 'Unauthorized',
        }),
        ApiResponse({
          status: 404,
          description: `${resource} not found`,
        }),
      ),

      create: applyDecorators(
        ApiOperation({
          summary: `Create ${resource}`,
          description: `Create a new ${resource}`,
        }),
        ApiResponse({
          status: 201,
          description: `${resource} created successfully`,
          type: schema,
        }),
        ApiResponse({
          status: 400,
          description: 'Bad request - Invalid input data',
        }),
        ApiResponse({
          status: 401,
          description: 'Unauthorized',
        }),
        ApiResponse({
          status: 409,
          description: `${resource} already exists`,
        }),
      ),

      update: applyDecorators(
        ApiOperation({
          summary: `Update ${resource}`,
          description: `Update an existing ${resource}`,
        }),
        ApiParam({
          name: 'id',
          description: `${resource} ID`,
          type: 'string',
        }),
        ApiResponse({
          status: 200,
          description: `${resource} updated successfully`,
          type: schema,
        }),
        ApiResponse({
          status: 400,
          description: 'Bad request - Invalid input data',
        }),
        ApiResponse({
          status: 401,
          description: 'Unauthorized',
        }),
        ApiResponse({
          status: 404,
          description: `${resource} not found`,
        }),
      ),

      delete: applyDecorators(
        ApiOperation({
          summary: `Delete ${resource}`,
          description: `Remove a ${resource} by its unique identifier`,
        }),
        ApiParam({
          name: 'id',
          description: `${resource} ID`,
          type: 'string',
        }),
        ApiResponse({
          status: 200,
          description: `${resource} deleted successfully`,
        }),
        ApiResponse({
          status: 401,
          description: 'Unauthorized',
        }),
        ApiResponse({
          status: 404,
          description: `${resource} not found`,
        }),
      ),
    };
  }

  /**
   * Creates pagination response decorators
   */
  static createPaginationDecorators(schema: any) {
    return applyDecorators(
      ApiResponse({
        status: 200,
        description: 'Paginated results retrieved successfully',
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: { $ref: `#/components/schemas/${schema.name}` },
            },
            pagination: {
              type: 'object',
              properties: {
                page: { type: 'number', example: 1 },
                limit: { type: 'number', example: 10 },
                total: { type: 'number', example: 100 },
                totalPages: { type: 'number', example: 10 },
              },
            },
          },
        },
      }),
    );
  }

  /**
   * Creates search/filter response decorators
   */
  static createSearchDecorators(schema: any) {
    return applyDecorators(
      ApiOperation({
        summary: 'Search/Filter items',
        description: 'Search or filter items based on various criteria',
      }),
      ApiResponse({
        status: 200,
        description: 'Search results retrieved successfully',
        type: [schema],
      }),
      ApiResponse({
        status: 400,
        description: 'Bad request - Invalid search parameters',
      }),
    );
  }

  /**
   * Creates bulk operation decorators
   */
  static createBulkOperationDecorators(operation: string, resource: string, schema: any) {
    return applyDecorators(
      ApiOperation({
        summary: `${operation} multiple ${resource}`,
        description: `Perform ${operation.toLowerCase()} operation on multiple ${resource}`,
      }),
      ApiResponse({
        status: 200,
        description: `Bulk ${operation.toLowerCase()} operation completed successfully`,
        type: [schema],
      }),
      ApiResponse({
        status: 400,
        description: 'Bad request - Invalid input data',
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized',
      }),
    );
  }

  /**
   * Creates file upload decorators
   */
  static createFileUploadDecorators(resource: string) {
    return applyDecorators(
      ApiOperation({
        summary: `Upload ${resource}`,
        description: `Upload ${resource} file`,
      }),
      ApiResponse({
        status: 201,
        description: `${resource} uploaded successfully`,
        schema: {
          type: 'object',
          properties: {
            filename: { type: 'string', example: 'file.jpg' },
            url: { type: 'string', example: 'https://example.com/file.jpg' },
            size: { type: 'number', example: 1024 },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Bad request - Invalid file',
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized',
      }),
    );
  }
} 