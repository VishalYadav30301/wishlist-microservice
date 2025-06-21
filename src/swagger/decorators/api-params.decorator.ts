import { ApiParam } from '@nestjs/swagger';

export const ApiParams = {
  // Common ID parameters
  id: (name: string = 'id', description?: string) =>
    ApiParam({
      name,
      description: description || `${name.charAt(0).toUpperCase() + name.slice(1)} ID`,
      type: 'string',
    }),

  productId: () =>
    ApiParam({
      name: 'productId',
      description: 'Product ID',
      type: 'string',
    }),

  userId: () =>
    ApiParam({
      name: 'userId',
      description: 'User ID',
      type: 'string',
    }),

  orderId: () =>
    ApiParam({
      name: 'orderId',
      description: 'Order ID',
      type: 'string',
    }),

  cartId: () =>
    ApiParam({
      name: 'cartId',
      description: 'Cart ID',
      type: 'string',
    }),

  wishlistId: () =>
    ApiParam({
      name: 'wishlistId',
      description: 'Wishlist ID',
      type: 'string',
    }),

  // Custom parameter
  custom: (name: string, description: string, type: string = 'string') =>
    ApiParam({
      name,
      description,
      type,
    }),
}; 