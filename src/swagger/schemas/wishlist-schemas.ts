import { ApiProperty } from '@nestjs/swagger';

// Wishlist Item Schema
export class WishlistItemSchema {
  @ApiProperty({
    description: 'Product ID',
    example: '507f1f77bcf86cd799439011',
  })
  productId: string;

  @ApiProperty({
    description: 'Product name',
    example: 'iPhone 15 Pro',
  })
  productName: string;

  @ApiProperty({
    description: 'Product price',
    example: 999.99,
  })
  price: number;

  @ApiProperty({
    description: 'Product image URL',
    example: 'https://example.com/iphone15pro.jpg',
  })
  image: string;

  @ApiProperty({
    description: 'Date when item was added to wishlist',
    example: '2024-01-15T10:30:00Z',
  })
  addedAt: Date;
}

// Wishlist Schema
export class WishlistSchema {
  @ApiProperty({
    description: 'Wishlist ID',
    example: '507f1f77bcf86cd799439012',
  })
  _id: string;

  @ApiProperty({
    description: 'User ID who owns the wishlist',
    example: '507f1f77bcf86cd799439013',
  })
  userId: string;

  @ApiProperty({
    description: 'Array of wishlist items',
    type: [WishlistItemSchema],
  })
  items: WishlistItemSchema[];

  @ApiProperty({
    description: 'Total number of items in wishlist',
    example: 5,
  })
  itemCount: number;

  @ApiProperty({
    description: 'Date when wishlist was created',
    example: '2024-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when wishlist was last updated',
    example: '2024-01-15T10:30:00Z',
  })
  updatedAt: Date;
}

// Add Items DTO Schema
export class AddItemsDtoSchema {
  @ApiProperty({
    description: 'Array of product IDs to add to wishlist',
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439014'],
    type: [String],
  })
  productIds: string[];
}

// Add to Cart DTO Schema
export class AddToCartDtoSchema {
  @ApiProperty({
    description: 'Array of product IDs to move from wishlist to cart',
    example: ['507f1f77bcf86cd799439011'],
    type: [String],
  })
  productIds: string[];
}

// Success Response Schema
export class SuccessResponseSchema {
  @ApiProperty({
    description: 'Success status',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Operation completed successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Response data',
    type: WishlistSchema,
  })
  data: WishlistSchema;
}

// Error Response Schema
export class ErrorResponseSchema {
  @ApiProperty({
    description: 'Error status',
    example: false,
  })
  success: boolean;

  @ApiProperty({
    description: 'Error message',
    example: 'Item not found in wishlist',
  })
  message: string;

  @ApiProperty({
    description: 'Error code',
    example: 'ITEM_NOT_FOUND',
  })
  errorCode?: string;
} 