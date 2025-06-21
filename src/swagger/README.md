# Swagger Documentation Management

This folder contains all Swagger-related configurations, decorators, and schemas for the Wishlist Microservice.

## Structure

```
swagger/
├── README.md                    # This documentation file
├── index.ts                     # Main export file
├── swagger.config.ts            # Centralized Swagger configuration
├── decorators/                  # Custom Swagger decorators
│   ├── index.ts                 # Decorators export file
│   ├── api-responses.decorator.ts    # Common API response decorators
│   ├── api-operations.decorator.ts   # Common API operation decorators
│   ├── api-params.decorator.ts       # Common API parameter decorators
│   └── api-tags.decorator.ts         # Common API tag decorators
└── schemas/                     # Swagger schemas and DTOs
    ├── index.ts                 # Schemas export file
    └── wishlist-schemas.ts      # Wishlist-related schemas
```

## Usage

### 1. Import Swagger Decorators

```typescript
import {
  ApiTagsDecorator,
  ApiOperations,
  ApiCommonResponses,
  ApiParams,
} from '../swagger';
```

### 2. Use in Controllers

```typescript
@ApiTagsDecorator.wishlist()
@ApiBearerAuth('JWT-auth')
@Controller('wishlist')
export class WishlistController {
  
  @Get()
  @ApiOperations.getWishlist()
  @ApiCommonResponses.withAuth(WishlistSchema)
  async getWishlist() {
    // Implementation
  }

  @Post('items')
  @ApiOperations.addItem()
  @ApiCommonResponses.createWithAuth(WishlistSchema)
  async addItem() {
    // Implementation
  }
}
```

### 3. Available Decorators

#### API Tags
- `ApiTagsDecorator.wishlist()` - For wishlist endpoints
- `ApiTagsDecorator.cart()` - For cart endpoints
- `ApiTagsDecorator.products()` - For product endpoints
- `ApiTagsDecorator.custom('Custom Tag')` - For custom tags

#### API Operations
- `ApiOperations.getWishlist()` - Get wishlist details
- `ApiOperations.addItem()` - Add item to wishlist
- `ApiOperations.removeItem()` - Remove item from wishlist
- `ApiOperations.clearWishlist()` - Clear wishlist
- `ApiOperations.addToCart()` - Add items to cart
- `ApiOperations.getAll('resource')` - Generic get all
- `ApiOperations.getById('resource')` - Generic get by ID
- `ApiOperations.create('resource')` - Generic create
- `ApiOperations.update('resource')` - Generic update
- `ApiOperations.delete('resource')` - Generic delete

#### API Responses
- `ApiCommonResponses.withAuth(type)` - Success + Unauthorized + Not Found
- `ApiCommonResponses.withAuthAndValidation(type)` - Success + Unauthorized + Bad Request + Not Found
- `ApiCommonResponses.createWithAuth(type)` - Created + Unauthorized + Bad Request + Conflict
- `ApiCommonResponses.success(description, type)` - Custom success response
- `ApiCommonResponses.created(description, type)` - Custom created response
- `ApiCommonResponses.unauthorized()` - Unauthorized response
- `ApiCommonResponses.notFound(description)` - Not found response
- `ApiCommonResponses.badRequest(description)` - Bad request response

#### API Parameters
- `ApiParams.productId()` - Product ID parameter
- `ApiParams.userId()` - User ID parameter
- `ApiParams.orderId()` - Order ID parameter
- `ApiParams.cartId()` - Cart ID parameter
- `ApiParams.wishlistId()` - Wishlist ID parameter
- `ApiParams.id('customId')` - Generic ID parameter
- `ApiParams.custom(name, description, type)` - Custom parameter

### 4. Available Schemas

- `WishlistSchema` - Complete wishlist object
- `WishlistItemSchema` - Individual wishlist item
- `AddItemsDtoSchema` - DTO for adding items
- `AddToCartDtoSchema` - DTO for adding to cart
- `SuccessResponseSchema` - Standard success response
- `ErrorResponseSchema` - Standard error response

## Benefits

1. **Centralized Management**: All Swagger configurations are in one place
2. **Consistency**: Standardized decorators ensure consistent API documentation
3. **Reusability**: Common patterns can be reused across controllers
4. **Maintainability**: Easy to update and maintain Swagger documentation
5. **Type Safety**: TypeScript support for all decorators and schemas
6. **Clean Code**: Controllers are cleaner without inline Swagger decorators

## Adding New Decorators

To add new decorators:

1. Create a new file in the `decorators/` folder
2. Export your decorators
3. Add the export to `decorators/index.ts`
4. Update this README with usage examples

## Adding New Schemas

To add new schemas:

1. Create a new file in the `schemas/` folder
2. Define your schemas with `@ApiProperty` decorators
3. Export your schemas
4. Add the export to `schemas/index.ts`
5. Update this README with schema descriptions 