import { ApiTags } from '@nestjs/swagger';

export const ApiTagsDecorator = {
  // Main feature tags
  wishlist: () => ApiTags('Wishlist'),
  cart: () => ApiTags('Cart'),
  products: () => ApiTags('Products'),
  orders: () => ApiTags('Orders'),
  users: () => ApiTags('Users'),
  auth: () => ApiTags('Authentication'),

  // Sub-feature tags
  wishlistManagement: () => ApiTags('Wishlist Management'),
  cartManagement: () => ApiTags('Cart Management'),
  productCatalog: () => ApiTags('Product Catalog'),
  orderManagement: () => ApiTags('Order Management'),
  userManagement: () => ApiTags('User Management'),
  authentication: () => ApiTags('Authentication'),

  // Custom tag
  custom: (tag: string) => ApiTags(tag),
}; 