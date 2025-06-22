export const BusinessRules = {
  // Wishlist Limits
  WISHLIST: {
    MAX_ITEMS: 100,
    MAX_ITEMS_PER_USER: 50,
    MIN_ITEMS_FOR_NOTIFICATION: 5,
  },

  // Product Rules
  PRODUCT: {
    MAX_PRICE: 1000000, // $1M
    MIN_PRICE: 0.01, // $0.01
    MAX_NAME_LENGTH: 200,
    MIN_NAME_LENGTH: 1,
  },

  // User Rules
  USER: {
    MAX_WISHLISTS_PER_USER: 1,
    MIN_AGE: 13,
    MAX_AGE: 120,
  },

  // Rate Limiting
  RATE_LIMITS: {
    REQUESTS_PER_MINUTE: 60,
    REQUESTS_PER_HOUR: 1000,
    REQUESTS_PER_DAY: 10000,
    BURST_LIMIT: 10,
  },

  // Cache Settings
  CACHE: {
    WISHLIST_TTL: 300, // 5 minutes
    PRODUCT_TTL: 3600, // 1 hour
    USER_TTL: 1800, // 30 minutes
    MAX_CACHE_SIZE: 1000,
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    MIN_PAGE_SIZE: 1,
  },

  // Validation Rules
  VALIDATION: {
    MAX_STRING_LENGTH: 1000,
    MIN_STRING_LENGTH: 1,
    MAX_ARRAY_LENGTH: 1000,
    MIN_ARRAY_LENGTH: 1,
  },

  // Security
  SECURITY: {
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 128,
    TOKEN_EXPIRY_HOURS: 24,
    REFRESH_TOKEN_EXPIRY_DAYS: 30,
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION_MINUTES: 15,
  },

  // File Upload
  FILE_UPLOAD: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    MAX_FILES_PER_REQUEST: 10,
  },

  // Notification
  NOTIFICATION: {
    MAX_RETRY_ATTEMPTS: 3,
    RETRY_DELAY_MS: 1000,
    BATCH_SIZE: 100,
  },

  // Performance
  PERFORMANCE: {
    MAX_QUERY_EXECUTION_TIME: 5000, // 5 seconds
    MAX_RESPONSE_TIME: 3000, // 3 seconds
    SLOW_QUERY_THRESHOLD: 1000, // 1 second
  },

  // Business Logic
  BUSINESS: {
    // Wishlist item limits
    MAX_QUANTITY_PER_ITEM: 99,
    MIN_QUANTITY_PER_ITEM: 1,
    
    // Price validation
    PRICE_PRECISION: 2, // Decimal places
    
    // Availability
    DEFAULT_AVAILABILITY: true,
    
    // Expiry
    DEFAULT_EXPIRY_DAYS: 365, // 1 year
    
    // Categories
    MAX_CATEGORIES_PER_ITEM: 5,
    
    // Tags
    MAX_TAGS_PER_ITEM: 10,
    MAX_TAG_LENGTH: 50,
  },

  // API Limits
  API: {
    MAX_REQUEST_BODY_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_URL_LENGTH: 2048,
    MAX_HEADERS_COUNT: 50,
    MAX_HEADER_SIZE: 8192,
  },

  // Database
  DATABASE: {
    MAX_CONNECTIONS: 100,
    CONNECTION_TIMEOUT: 30000, // 30 seconds
    QUERY_TIMEOUT: 30000, // 30 seconds
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000, // 1 second
  },

  // External Services
  EXTERNAL_SERVICES: {
    TIMEOUT: 10000, // 10 seconds
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000, // 1 second
    CIRCUIT_BREAKER_THRESHOLD: 5,
    CIRCUIT_BREAKER_TIMEOUT: 60000, // 1 minute
  },
} as const;

// Type for business rules
export type BusinessRulesType = typeof BusinessRules;

// Helper function to get nested business rules
export function getBusinessRule<T extends keyof BusinessRulesType>(
  category: T,
  key: keyof BusinessRulesType[T]
): BusinessRulesType[T][keyof BusinessRulesType[T]] {
  return BusinessRules[category][key];
}

// Validation helpers
export const ValidationHelpers = {
  isValidQuantity: (quantity: number): boolean => {
    return quantity >= BusinessRules.BUSINESS.MIN_QUANTITY_PER_ITEM && 
           quantity <= BusinessRules.BUSINESS.MAX_QUANTITY_PER_ITEM;
  },

  isValidPrice: (price: number): boolean => {
    return price >= BusinessRules.PRODUCT.MIN_PRICE && 
           price <= BusinessRules.PRODUCT.MAX_PRICE;
  },

  isValidWishlistSize: (itemCount: number): boolean => {
    return itemCount <= BusinessRules.WISHLIST.MAX_ITEMS;
  },

  isValidPageSize: (pageSize: number): boolean => {
    return pageSize >= BusinessRules.PAGINATION.MIN_PAGE_SIZE && 
           pageSize <= BusinessRules.PAGINATION.MAX_PAGE_SIZE;
  },

  isValidStringLength: (str: string): boolean => {
    return str.length >= BusinessRules.VALIDATION.MIN_STRING_LENGTH && 
           str.length <= BusinessRules.VALIDATION.MAX_STRING_LENGTH;
  },

  isValidArrayLength: (arr: any[]): boolean => {
    return arr.length >= BusinessRules.VALIDATION.MIN_ARRAY_LENGTH && 
           arr.length <= BusinessRules.VALIDATION.MAX_ARRAY_LENGTH;
  },
}; 