export enum ErrorCodes {
  // Authentication & Authorization
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',

  // Validation Errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',

  // Database Errors
  DATABASE_ERROR = 'DATABASE_ERROR',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  QUERY_ERROR = 'QUERY_ERROR',
  DUPLICATE_KEY = 'DUPLICATE_KEY',

  // Wishlist Specific Errors
  WISHLIST_NOT_FOUND = 'WISHLIST_NOT_FOUND',
  ITEM_NOT_FOUND = 'ITEM_NOT_FOUND',
  ITEM_ALREADY_EXISTS = 'ITEM_ALREADY_EXISTS',
  WISHLIST_EMPTY = 'WISHLIST_EMPTY',
  MAX_ITEMS_EXCEEDED = 'MAX_ITEMS_EXCEEDED',

  // Product Related Errors
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  PRODUCT_UNAVAILABLE = 'PRODUCT_UNAVAILABLE',
  PRODUCT_INVALID = 'PRODUCT_INVALID',

  // User Related Errors
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_INACTIVE = 'USER_INACTIVE',

  // External Service Errors
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',

  // Rate Limiting
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',

  // General Errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  BAD_REQUEST = 'BAD_REQUEST',
  CONFLICT = 'CONFLICT',
}

export const ErrorMessages: Record<ErrorCodes, string> = {
  [ErrorCodes.UNAUTHORIZED]: 'Authentication required',
  [ErrorCodes.FORBIDDEN]: 'Access denied',
  [ErrorCodes.INVALID_TOKEN]: 'Invalid authentication token',
  [ErrorCodes.TOKEN_EXPIRED]: 'Authentication token has expired',
  [ErrorCodes.VALIDATION_ERROR]: 'Validation failed',
  [ErrorCodes.INVALID_INPUT]: 'Invalid input provided',
  [ErrorCodes.MISSING_REQUIRED_FIELD]: 'Required field is missing',
  [ErrorCodes.INVALID_FORMAT]: 'Invalid data format',
  [ErrorCodes.DATABASE_ERROR]: 'Database operation failed',
  [ErrorCodes.CONNECTION_ERROR]: 'Database connection failed',
  [ErrorCodes.QUERY_ERROR]: 'Database query failed',
  [ErrorCodes.DUPLICATE_KEY]: 'Duplicate entry found',
  [ErrorCodes.WISHLIST_NOT_FOUND]: 'Wishlist not found',
  [ErrorCodes.ITEM_NOT_FOUND]: 'Item not found in wishlist',
  [ErrorCodes.ITEM_ALREADY_EXISTS]: 'Item already exists in wishlist',
  [ErrorCodes.WISHLIST_EMPTY]: 'Wishlist is empty',
  [ErrorCodes.MAX_ITEMS_EXCEEDED]: 'Maximum number of items exceeded',
  [ErrorCodes.PRODUCT_NOT_FOUND]: 'Product not found',
  [ErrorCodes.PRODUCT_UNAVAILABLE]: 'Product is currently unavailable',
  [ErrorCodes.PRODUCT_INVALID]: 'Invalid product information',
  [ErrorCodes.USER_NOT_FOUND]: 'User not found',
  [ErrorCodes.USER_INACTIVE]: 'User account is inactive',
  [ErrorCodes.EXTERNAL_SERVICE_ERROR]: 'External service error',
  [ErrorCodes.SERVICE_UNAVAILABLE]: 'Service temporarily unavailable',
  [ErrorCodes.TIMEOUT_ERROR]: 'Request timeout',
  [ErrorCodes.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded',
  [ErrorCodes.TOO_MANY_REQUESTS]: 'Too many requests',
  [ErrorCodes.INTERNAL_SERVER_ERROR]: 'Internal server error',
  [ErrorCodes.NOT_FOUND]: 'Resource not found',
  [ErrorCodes.BAD_REQUEST]: 'Bad request',
  [ErrorCodes.CONFLICT]: 'Resource conflict',
};

export const ErrorHttpStatus: Record<ErrorCodes, number> = {
  [ErrorCodes.UNAUTHORIZED]: 401,
  [ErrorCodes.FORBIDDEN]: 403,
  [ErrorCodes.INVALID_TOKEN]: 401,
  [ErrorCodes.TOKEN_EXPIRED]: 401,
  [ErrorCodes.VALIDATION_ERROR]: 400,
  [ErrorCodes.INVALID_INPUT]: 400,
  [ErrorCodes.MISSING_REQUIRED_FIELD]: 400,
  [ErrorCodes.INVALID_FORMAT]: 400,
  [ErrorCodes.DATABASE_ERROR]: 500,
  [ErrorCodes.CONNECTION_ERROR]: 500,
  [ErrorCodes.QUERY_ERROR]: 500,
  [ErrorCodes.DUPLICATE_KEY]: 409,
  [ErrorCodes.WISHLIST_NOT_FOUND]: 404,
  [ErrorCodes.ITEM_NOT_FOUND]: 404,
  [ErrorCodes.ITEM_ALREADY_EXISTS]: 409,
  [ErrorCodes.WISHLIST_EMPTY]: 404,
  [ErrorCodes.MAX_ITEMS_EXCEEDED]: 400,
  [ErrorCodes.PRODUCT_NOT_FOUND]: 404,
  [ErrorCodes.PRODUCT_UNAVAILABLE]: 400,
  [ErrorCodes.PRODUCT_INVALID]: 400,
  [ErrorCodes.USER_NOT_FOUND]: 404,
  [ErrorCodes.USER_INACTIVE]: 403,
  [ErrorCodes.EXTERNAL_SERVICE_ERROR]: 502,
  [ErrorCodes.SERVICE_UNAVAILABLE]: 503,
  [ErrorCodes.TIMEOUT_ERROR]: 408,
  [ErrorCodes.RATE_LIMIT_EXCEEDED]: 429,
  [ErrorCodes.TOO_MANY_REQUESTS]: 429,
  [ErrorCodes.INTERNAL_SERVER_ERROR]: 500,
  [ErrorCodes.NOT_FOUND]: 404,
  [ErrorCodes.BAD_REQUEST]: 400,
  [ErrorCodes.CONFLICT]: 409,
}; 