# Swagger Migration Guide

## Overview

This document outlines the migration from inline Swagger decorators to a centralized Swagger management system.

## What Changed

### Before (Inline Swagger)
```typescript
// Controller with inline Swagger decorators
@ApiTags('Wishlist')
@ApiBearerAuth('JWT-auth')
@Controller('wishlist')
export class WishlistController {
  
  @Get()
  @ApiOperation({ summary: 'Get wishlist details' })
  @ApiResponse({
    status: 200,
    description: 'Returns the wishlist details',
    type: Wishlist,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Wishlist not found' })
  async getWishlist(@Request() req) {
    return this.wishlistService.getWishlist(req.user.entityId);
  }
}
```

### After (Centralized Swagger)
```typescript
// Controller using centralized Swagger decorators
@ApiTagsDecorator.wishlist()
@ApiBearerAuth('JWT-auth')
@Controller('wishlist')
export class WishlistController {
  
  @Get()
  @ApiOperations.getWishlist()
  @ApiCommonResponses.withAuth(WishlistSchema)
  async getWishlist(@Request() req) {
    return this.wishlistService.getWishlist(req.user.entityId);
  }
}
```

## New Structure

```
src/swagger/
├── README.md                    # Documentation
├── index.ts                     # Main exports
├── swagger.config.ts            # Centralized configuration
├── config/                      # Environment configurations
│   ├── index.ts
│   └── swagger-env.config.ts
├── decorators/                  # Custom decorators
│   ├── index.ts
│   ├── api-responses.decorator.ts
│   ├── api-operations.decorator.ts
│   ├── api-params.decorator.ts
│   └── api-tags.decorator.ts
├── schemas/                     # Swagger schemas
│   ├── index.ts
│   └── wishlist-schemas.ts
└── utils/                       # Utility functions
    ├── index.ts
    └── swagger-utils.ts
```

## Benefits

1. **Centralized Management**: All Swagger configurations in one place
2. **Consistency**: Standardized decorators across all controllers
3. **Reusability**: Common patterns can be reused
4. **Maintainability**: Easy to update and maintain
5. **Environment Support**: Different configurations for dev/staging/prod
6. **Type Safety**: Full TypeScript support
7. **Clean Code**: Controllers are cleaner and more focused

## Migration Steps

### 1. Update Imports
```typescript
// Old imports
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

// New imports
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  ApiTagsDecorator,
  ApiOperations,
  ApiCommonResponses,
  ApiParams,
} from '../swagger';
import { WishlistSchema } from '../swagger/schemas';
```

### 2. Replace Decorators
```typescript
// Old way
@ApiTags('Wishlist')
@ApiOperation({ summary: 'Get wishlist details' })
@ApiResponse({ status: 200, description: 'Success', type: Wishlist })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 404, description: 'Not found' })

// New way
@ApiTagsDecorator.wishlist()
@ApiOperations.getWishlist()
@ApiCommonResponses.withAuth(WishlistSchema)
```

### 3. Update Main Configuration
```typescript
// Old way in main.ts
const config = new DocumentBuilder()
  .setTitle('Wishlist Microservice API')
  .setDescription('...')
  .setVersion('1.0')
  .addBearerAuth(...)
  .build();

// New way in main.ts
const environment = process.env.NODE_ENV || 'development';
SwaggerConfig.setup(app, environment);
```

## Available Decorators

### API Tags
- `ApiTagsDecorator.wishlist()`
- `ApiTagsDecorator.cart()`
- `ApiTagsDecorator.products()`
- `ApiTagsDecorator.custom('Custom Tag')`

### API Operations
- `ApiOperations.getWishlist()`
- `ApiOperations.addItem()`
- `ApiOperations.removeItem()`
- `ApiOperations.clearWishlist()`
- `ApiOperations.addToCart()`
- `ApiOperations.getAll('resource')`
- `ApiOperations.getById('resource')`
- `ApiOperations.create('resource')`
- `ApiOperations.update('resource')`
- `ApiOperations.delete('resource')`

### API Responses
- `ApiCommonResponses.withAuth(type)`
- `ApiCommonResponses.withAuthAndValidation(type)`
- `ApiCommonResponses.createWithAuth(type)`
- `ApiCommonResponses.success(description, type)`
- `ApiCommonResponses.created(description, type)`
- `ApiCommonResponses.unauthorized()`
- `ApiCommonResponses.notFound(description)`
- `ApiCommonResponses.badRequest(description)`

### API Parameters
- `ApiParams.productId()`
- `ApiParams.userId()`
- `ApiParams.orderId()`
- `ApiParams.cartId()`
- `ApiParams.wishlistId()`
- `ApiParams.id('customId')`
- `ApiParams.custom(name, description, type)`

## Environment Configuration

The system now supports different environments:

```typescript
// Development
SwaggerConfig.setup(app, 'development');

// Staging
SwaggerConfig.setup(app, 'staging');

// Production
SwaggerConfig.setup(app, 'production');
```

Each environment has its own:
- Title and description
- Version number
- Contact information
- Server URLs
- License information

## Next Steps

1. Apply this pattern to other microservices
2. Create additional decorators as needed
3. Add more schemas for different entities
4. Extend utility functions for common patterns
5. Add validation decorators
6. Create testing utilities for Swagger documentation

## Testing

To verify the migration:

1. Start the application
2. Navigate to `/api` endpoint
3. Verify all endpoints are properly documented
4. Check that authentication is working
5. Test different environments if needed

## Support

For questions or issues with the new Swagger system, refer to:
- `src/swagger/README.md` - Detailed documentation
- `src/swagger/utils/swagger-utils.ts` - Utility functions
- `src/swagger/config/swagger-env.config.ts` - Environment configurations 