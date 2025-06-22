# Enterprise-Level Wishlist Module Structure

This document outlines the comprehensive enterprise-level improvements made to the Wishlist Microservice to align with company standards and best practices.

## 🏗️ **Architecture Overview**

The wishlist module now follows enterprise-grade patterns with:

- **Centralized Error Management**
- **Business Rule Enforcement**
- **Structured Logging**
- **Rate Limiting & Caching**
- **Custom Validators**
- **Guards & Interceptors**
- **Constants Management**

## 📁 **Enhanced Structure**

```
src/
├── common/                          # Shared enterprise components
│   ├── constants/                   # Business rules & error codes
│   │   ├── error-codes.ts          # Centralized error codes
│   │   ├── business-rules.ts       # Business logic constants
│   │   └── index.ts                # Constants exports
│   ├── exceptions/                  # Custom exception handling
│   │   ├── custom-exception.ts     # Enterprise exception class
│   │   └── index.ts                # Exception exports
│   ├── validators/                  # Custom validation decorators
│   │   ├── custom-validators.ts    # Business rule validators
│   │   └── index.ts                # Validator exports
│   ├── decorators/                  # Custom decorators
│   │   ├── rate-limit.decorator.ts # Rate limiting decorators
│   │   ├── cache.decorator.ts      # Caching decorators
│   │   └── index.ts                # Decorator exports
│   ├── guards/                      # Custom guards
│   │   ├── business-rule.guard.ts  # Business rule enforcement
│   │   └── index.ts                # Guard exports
│   ├── logger/                      # Centralized logging system
│   │   ├── logger.service.ts       # Custom logger service
│   │   ├── logger.middleware.ts    # Request/response logging
│   │   ├── logger.interceptor.ts   # Method execution logging
│   │   ├── logger.module.ts        # Logger module
│   │   ├── logger.config.ts        # Environment configs
│   │   └── index.ts                # Logger exports
│   └── index.ts                     # Main common exports
├── swagger/                         # Centralized Swagger management
│   ├── config/                      # Environment configurations
│   ├── decorators/                  # Custom Swagger decorators
│   ├── schemas/                     # Swagger schemas
│   ├── utils/                       # Swagger utilities
│   └── index.ts                     # Swagger exports
└── wishlist/                        # Core business logic
    ├── dto/                         # Data transfer objects
    ├── schemas/                     # Database schemas
    ├── wishlist.controller.ts       # Enhanced controller
    ├── wishlist.service.ts          # Business logic
    └── wishlist.module.ts           # Module configuration
```

## 🎯 **Key Enterprise Features**

### **1. Centralized Error Management**

#### **Error Codes System**
```typescript
export enum ErrorCodes {
  UNAUTHORIZED = 'UNAUTHORIZED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  WISHLIST_NOT_FOUND = 'WISHLIST_NOT_FOUND',
  ITEM_ALREADY_EXISTS = 'ITEM_ALREADY_EXISTS',
  // ... more error codes
}
```

#### **Custom Exception Class**
```typescript
// Consistent error responses
throw CustomException.wishlistError(
  ErrorCodes.ITEM_ALREADY_EXISTS,
  'Product already in wishlist',
  { productId: '123' },
  'WishlistService.addItem'
);
```

**Benefits:**
- ✅ Consistent error responses across the application
- ✅ Centralized error codes and messages
- ✅ Proper HTTP status codes mapping
- ✅ Request tracing with requestId and userId
- ✅ Structured error details for debugging

### **2. Business Rules Management**

#### **Centralized Business Rules**
```typescript
export const BusinessRules = {
  WISHLIST: {
    MAX_ITEMS: 100,
    MAX_ITEMS_PER_USER: 50,
  },
  PRODUCT: {
    MAX_PRICE: 1000000,
    MIN_PRICE: 0.01,
  },
  RATE_LIMITS: {
    REQUESTS_PER_MINUTE: 60,
    REQUESTS_PER_HOUR: 1000,
  },
  // ... more business rules
};
```

#### **Validation Helpers**
```typescript
export const ValidationHelpers = {
  isValidQuantity: (quantity: number): boolean => {
    return quantity >= BusinessRules.BUSINESS.MIN_QUANTITY_PER_ITEM && 
           quantity <= BusinessRules.BUSINESS.MAX_QUANTITY_PER_ITEM;
  },
  // ... more validation helpers
};
```

**Benefits:**
- ✅ All business rules in one place
- ✅ Easy to modify and maintain
- ✅ Type-safe business rule access
- ✅ Validation helpers for common checks
- ✅ Environment-specific configurations

### **3. Custom Validators**

#### **Business Rule Validators**
```typescript
export class AddItemsDto {
  @IsMongoId()
  productId: string;

  @IsValidQuantity()
  quantity: number;

  @IsValidPrice()
  price: number;
}
```

**Available Validators:**
- `@IsValidQuantity()` - Validates quantity within business limits
- `@IsValidPrice()` - Validates price within acceptable range
- `@IsValidWishlistSize()` - Validates wishlist item count
- `@IsValidStringLength()` - Validates string length
- `@IsValidArrayLength()` - Validates array length
- `@IsValidPageSize()` - Validates pagination size
- `@IsMongoId()` - Validates MongoDB ObjectId format
- `@IsValidEmail()` - Validates email format
- `@IsValidPhoneNumber()` - Validates phone number format
- `@IsValidUrl()` - Validates URL format
- `@IsValidDate()` - Validates date format
- `@IsFutureDate()` - Validates future date
- `@IsPastDate()` - Validates past date

### **4. Rate Limiting & Caching**

#### **Rate Limiting Decorators**
```typescript
@RateLimitStrict()        // 60 requests per minute
@RateLimitModerate()      // 120 requests per minute
@RateLimitLoose()         // 300 requests per minute
@RateLimitBurst()         // 10 requests per 10 seconds
@RateLimitHourly()        // 1000 requests per hour
@RateLimitDaily()         // 10000 requests per day
```

#### **Caching Decorators**
```typescript
@CacheWishlist()          // Cache for 5 minutes
@CacheProduct()           // Cache for 1 hour
@CacheUser()              // Cache for 30 minutes
@CacheShort()             // Cache for 1 minute
@CacheMedium()            // Cache for 5 minutes
@CacheLong()              // Cache for 1 hour
```

### **5. Business Rule Guard**

#### **Automatic Business Rule Enforcement**
```typescript
@UseGuards(BusinessRuleGuard)
@Controller('wishlist')
export class WishlistController {
  // All requests automatically validated against business rules
}
```

**Guard Features:**
- ✅ User authentication validation
- ✅ User status validation
- ✅ Request body validation
- ✅ Request parameters validation
- ✅ Query parameters validation
- ✅ MongoDB ObjectId format validation
- ✅ Pagination parameter validation
- ✅ Date format validation
- ✅ Sort parameter validation

### **6. Enhanced Logging System**

#### **Structured Logging**
```typescript
this.logger.logBusinessEvent('Item added to wishlist', {
  userId: 'user123',
  productId: 'prod789',
  quantity: 1,
}, {
  service: 'wishlist-service',
  method: 'WishlistController.addItem',
  requestId: 'req456',
});
```

**Logging Features:**
- ✅ Request/response logging middleware
- ✅ Method execution logging interceptor
- ✅ Performance metrics logging
- ✅ Business event logging
- ✅ Database operation logging
- ✅ External service logging
- ✅ Authentication event logging
- ✅ Environment-based configuration
- ✅ External logging service integration

## 🔧 **Usage Examples**

### **Enhanced Controller**
```typescript
@ApiTagsDecorator.wishlist()
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard, BusinessRuleGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(
    private readonly wishlistService: WishlistService,
    private readonly logger: CustomLoggerService,
  ) {}

  @Get()
  @RateLimitModerate()
  @CacheWishlist()
  @ApiOperations.getWishlist()
  @ApiCommonResponses.withAuth(WishlistSchema)
  async getWishlist(@Request() req) {
    this.logger.log('Getting wishlist for user', {
      service: 'wishlist-service',
      method: 'WishlistController.getWishlist',
      userId: req.user.entityId,
      requestId: (req as any).requestId,
    });

    const result = await this.wishlistService.getWishlist(req.user.entityId);
    
    this.logger.log('Wishlist retrieved successfully', {
      service: 'wishlist-service',
      method: 'WishlistController.getWishlist',
      userId: req.user.entityId,
      requestId: (req as any).requestId,
      itemCount: result?.items?.length || 0,
    });

    return result;
  }
}
```

### **Enhanced DTOs**
```typescript
export class AddItemsDto {
  @ApiProperty({
    description: 'Product ID',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId({ message: 'Product ID must be a valid MongoDB ObjectId' })
  productId: string;

  @ApiProperty({
    description: 'Quantity of the product',
    example: 1,
    minimum: 1,
    maximum: 99,
  })
  @IsOptional()
  @IsNumber()
  @IsValidQuantity({ message: 'Quantity must be between 1 and 99' })
  quantity?: number;
}
```

### **Enhanced Service**
```typescript
@Injectable()
export class WishlistService {
  constructor(
    private readonly logger: CustomLoggerService,
  ) {}

  async addItem(userId: string, addItemDto: AddItemsDto) {
    try {
      // Business logic implementation
      const result = await this.wishlistModel.findOneAndUpdate(
        { userId },
        { $addToSet: { items: addItemDto } },
        { new: true, upsert: true }
      );

      this.logger.logBusinessEvent('Item added to wishlist', {
        userId,
        productId: addItemDto.productId,
        quantity: addItemDto.quantity,
      }, {
        service: 'wishlist-service',
        method: 'WishlistService.addItem',
      });

      return result;
    } catch (error) {
      this.logger.error('Failed to add item to wishlist', {
        service: 'wishlist-service',
        method: 'WishlistService.addItem',
        userId,
        error: error.message,
      }, error.stack);

      throw CustomException.databaseError(
        'Failed to add item to wishlist',
        { userId, productId: addItemDto.productId },
        'WishlistService.addItem'
      );
    }
  }
}
```

## 🚀 **Benefits**

### **For Developers**
- ✅ **Consistency**: Standardized patterns across the application
- ✅ **Maintainability**: Centralized business rules and error handling
- ✅ **Type Safety**: Full TypeScript support with proper typing
- ✅ **Debugging**: Comprehensive logging and error tracking
- ✅ **Performance**: Built-in caching and rate limiting

### **For Business**
- ✅ **Compliance**: Enforced business rules and validation
- ✅ **Security**: Rate limiting and input validation
- ✅ **Monitoring**: Comprehensive logging and metrics
- ✅ **Scalability**: Caching and performance optimizations
- ✅ **Reliability**: Proper error handling and recovery

### **For Operations**
- ✅ **Observability**: Structured logging and request tracing
- ✅ **Monitoring**: Performance metrics and error tracking
- ✅ **Alerting**: Configurable error thresholds and notifications
- ✅ **Troubleshooting**: Detailed error information and context
- ✅ **Maintenance**: Centralized configuration management

## 📊 **Metrics & Monitoring**

The enhanced structure provides:

- **Request/Response Metrics**: Duration, status codes, response sizes
- **Business Metrics**: User actions, wishlist operations, product interactions
- **Performance Metrics**: Database query times, external service calls
- **Error Metrics**: Error rates, types, and impact analysis
- **User Metrics**: User activity, engagement, and behavior patterns

## 🔄 **Next Steps**

1. **Apply to Other Services**: Extend this pattern to other microservices
2. **Monitoring Dashboard**: Create centralized monitoring and alerting
3. **Performance Optimization**: Implement advanced caching strategies
4. **Security Enhancement**: Add additional security measures
5. **Documentation**: Create comprehensive API documentation
6. **Testing**: Implement comprehensive test coverage
7. **CI/CD**: Set up automated deployment pipelines

## 📚 **Documentation**

- `src/common/logger/README.md` - Logging system documentation
- `src/swagger/README.md` - Swagger management documentation
- `SWAGGER_MIGRATION.md` - Swagger migration guide
- `ENTERPRISE_STRUCTURE.md` - This comprehensive guide

This enterprise-level structure ensures your wishlist module is production-ready, maintainable, and aligned with industry best practices. 