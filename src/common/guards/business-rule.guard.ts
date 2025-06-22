import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CustomException } from '../exceptions';
import { BusinessRules, ValidationHelpers } from '../constants';
import { CustomLoggerService } from '../logger';

@Injectable()
export class BusinessRuleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private logger: CustomLoggerService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user, body, params, query } = request;
    const requestId = (request as any).requestId;

    try {
      // Check user authentication
      if (!user) {
        throw CustomException.unauthorized('User not authenticated', null, 'BusinessRuleGuard');
      }

      // Check user status
      if (user.status === 'inactive') {
        throw CustomException.forbidden('User account is inactive', null, 'BusinessRuleGuard');
      }

      // Validate request body if present
      if (body) {
        this.validateRequestBody(body, requestId);
      }

      // Validate request parameters if present
      if (params) {
        this.validateRequestParams(params, requestId);
      }

      // Validate query parameters if present
      if (query) {
        this.validateQueryParams(query, requestId);
      }

      this.logger.debug('Business rules validation passed', {
        service: 'wishlist-service',
        method: 'BusinessRuleGuard.canActivate',
        requestId,
        userId: user?.entityId,
      });

      return true;
    } catch (error) {
      this.logger.warn('Business rules validation failed', {
        service: 'wishlist-service',
        method: 'BusinessRuleGuard.canActivate',
        requestId,
        userId: user?.entityId,
        error: error.message,
      });

      throw error;
    }
  }

  private validateRequestBody(body: any, requestId: string): void {
    // Validate wishlist item limits
    if (body.productIds && Array.isArray(body.productIds)) {
      if (!ValidationHelpers.isValidArrayLength(body.productIds)) {
        throw CustomException.businessRuleViolation(
          'Product IDs array length exceeds limit',
          { maxLength: BusinessRules.VALIDATION.MAX_ARRAY_LENGTH },
          'BusinessRuleGuard.validateRequestBody'
        );
      }
    }

    // Validate quantity if present
    if (body.quantity !== undefined) {
      if (!ValidationHelpers.isValidQuantity(body.quantity)) {
        throw CustomException.businessRuleViolation(
          'Invalid quantity',
          { 
            min: BusinessRules.BUSINESS.MIN_QUANTITY_PER_ITEM,
            max: BusinessRules.BUSINESS.MAX_QUANTITY_PER_ITEM 
          },
          'BusinessRuleGuard.validateRequestBody'
        );
      }
    }

    // Validate price if present
    if (body.price !== undefined) {
      if (!ValidationHelpers.isValidPrice(body.price)) {
        throw CustomException.businessRuleViolation(
          'Invalid price',
          { 
            min: BusinessRules.PRODUCT.MIN_PRICE,
            max: BusinessRules.PRODUCT.MAX_PRICE 
          },
          'BusinessRuleGuard.validateRequestBody'
        );
      }
    }

    // Validate string lengths
    Object.keys(body).forEach(key => {
      if (typeof body[key] === 'string' && !ValidationHelpers.isValidStringLength(body[key])) {
        throw CustomException.businessRuleViolation(
          `Invalid ${key} length`,
          { 
            min: BusinessRules.VALIDATION.MIN_STRING_LENGTH,
            max: BusinessRules.VALIDATION.MAX_STRING_LENGTH 
          },
          'BusinessRuleGuard.validateRequestBody'
        );
      }
    });
  }

  private validateRequestParams(params: any, requestId: string): void {
    // Validate MongoDB ObjectId format
    if (params.productId && !/^[0-9a-fA-F]{24}$/.test(params.productId)) {
      throw CustomException.validationError(
        'Invalid product ID format',
        { productId: params.productId },
        'BusinessRuleGuard.validateRequestParams'
      );
    }

    if (params.userId && !/^[0-9a-fA-F]{24}$/.test(params.userId)) {
      throw CustomException.validationError(
        'Invalid user ID format',
        { userId: params.userId },
        'BusinessRuleGuard.validateRequestParams'
      );
    }

    if (params.wishlistId && !/^[0-9a-fA-F]{24}$/.test(params.wishlistId)) {
      throw CustomException.validationError(
        'Invalid wishlist ID format',
        { wishlistId: params.wishlistId },
        'BusinessRuleGuard.validateRequestParams'
      );
    }
  }

  private validateQueryParams(query: any, requestId: string): void {
    // Validate pagination parameters
    if (query.pageSize) {
      const pageSize = parseInt(query.pageSize);
      if (!ValidationHelpers.isValidPageSize(pageSize)) {
        throw CustomException.businessRuleViolation(
          'Invalid page size',
          { 
            min: BusinessRules.PAGINATION.MIN_PAGE_SIZE,
            max: BusinessRules.PAGINATION.MAX_PAGE_SIZE 
          },
          'BusinessRuleGuard.validateQueryParams'
        );
      }
    }

    if (query.page) {
      const page = parseInt(query.page);
      if (page < 1) {
        throw CustomException.businessRuleViolation(
          'Invalid page number',
          { min: 1 },
          'BusinessRuleGuard.validateQueryParams'
        );
      }
    }

    // Validate date parameters
    if (query.startDate) {
      const startDate = new Date(query.startDate);
      if (isNaN(startDate.getTime())) {
        throw CustomException.validationError(
          'Invalid start date format',
          { startDate: query.startDate },
          'BusinessRuleGuard.validateQueryParams'
        );
      }
    }

    if (query.endDate) {
      const endDate = new Date(query.endDate);
      if (isNaN(endDate.getTime())) {
        throw CustomException.validationError(
          'Invalid end date format',
          { endDate: query.endDate },
          'BusinessRuleGuard.validateQueryParams'
        );
      }
    }

    // Validate sort parameters
    if (query.sortBy) {
      const allowedSortFields = ['createdAt', 'updatedAt', 'name', 'price', 'quantity'];
      if (!allowedSortFields.includes(query.sortBy)) {
        throw CustomException.businessRuleViolation(
          'Invalid sort field',
          { allowedFields: allowedSortFields },
          'BusinessRuleGuard.validateQueryParams'
        );
      }
    }

    if (query.sortOrder) {
      const allowedSortOrders = ['asc', 'desc'];
      if (!allowedSortOrders.includes(query.sortOrder.toLowerCase())) {
        throw CustomException.businessRuleViolation(
          'Invalid sort order',
          { allowedOrders: allowedSortOrders },
          'BusinessRuleGuard.validateQueryParams'
        );
      }
    }
  }
}                   