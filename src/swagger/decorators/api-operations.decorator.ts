import { ApiOperation } from '@nestjs/swagger';

export const ApiOperations = {
  // Wishlist operations
  getWishlist: () =>
    ApiOperation({
      summary: 'Get wishlist details',
      description: 'Retrieve the current user\'s wishlist with all items and details',
    }),

  addItem: () =>
    ApiOperation({
      summary: 'Add item to wishlist',
      description: 'Add a new product to the user\'s wishlist',
    }),

  removeItem: () =>
    ApiOperation({
      summary: 'Remove item from wishlist',
      description: 'Remove a specific product from the user\'s wishlist',
    }),

  clearWishlist: () =>
    ApiOperation({
      summary: 'Clear wishlist',
      description: 'Remove all items from the user\'s wishlist',
    }),

  addToCart: () =>
    ApiOperation({
      summary: 'Add items to cart',
      description: 'Move selected items from wishlist to shopping cart',
    }),

  // Generic CRUD operations
  getAll: (resource: string) =>
    ApiOperation({
      summary: `Get all ${resource}`,
      description: `Retrieve a list of all ${resource}`,
    }),

  getById: (resource: string) =>
    ApiOperation({
      summary: `Get ${resource} by ID`,
      description: `Retrieve a specific ${resource} by its unique identifier`,
    }),

  create: (resource: string) =>
    ApiOperation({
      summary: `Create ${resource}`,
      description: `Create a new ${resource}`,
    }),

  update: (resource: string) =>
    ApiOperation({
      summary: `Update ${resource}`,
      description: `Update an existing ${resource}`,
    }),

  delete: (resource: string) =>
    ApiOperation({
      summary: `Delete ${resource}`,
      description: `Remove a ${resource} by its unique identifier`,
    }),

  // Authentication operations
  login: () =>
    ApiOperation({
      summary: 'User login',
      description: 'Authenticate user with email and password',
    }),

  register: () =>
    ApiOperation({
      summary: 'User registration',
      description: 'Create a new user account',
    }),

  logout: () =>
    ApiOperation({
      summary: 'User logout',
      description: 'Logout the current user and invalidate session',
    }),

  // Custom operations
  custom: (summary: string, description?: string) =>
    ApiOperation({
      summary,
      description,
    }),
}; 