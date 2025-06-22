import { SetMetadata } from '@nestjs/common';
import { BusinessRules } from '../constants';

export interface CacheOptions {
  ttl: number; // Time to live in seconds
  key?: string; // Custom cache key
  tags?: string[]; // Cache tags for invalidation
  maxSize?: number; // Maximum cache size
}

export const CACHE_KEY = 'cache';

export const Cache = (options: CacheOptions) => SetMetadata(CACHE_KEY, options);

// Predefined cache decorators
export const CacheWishlist = () => Cache({
  ttl: BusinessRules.CACHE.WISHLIST_TTL,
  key: 'wishlist',
  tags: ['wishlist'],
});

export const CacheProduct = () => Cache({
  ttl: BusinessRules.CACHE.PRODUCT_TTL,
  key: 'product',
  tags: ['product'],
});

export const CacheUser = () => Cache({
  ttl: BusinessRules.CACHE.USER_TTL,
  key: 'user',
  tags: ['user'],
});

export const CacheShort = () => Cache({
  ttl: 60, // 1 minute
  key: 'short',
});

export const CacheMedium = () => Cache({
  ttl: 300, // 5 minutes
  key: 'medium',
});

export const CacheLong = () => Cache({
  ttl: 3600, // 1 hour
  key: 'long',
});

export const CacheUserSpecific = (userId: string) => Cache({
  ttl: BusinessRules.CACHE.USER_TTL,
  key: `user:${userId}`,
  tags: ['user', userId],
});

export const CacheWishlistSpecific = (wishlistId: string) => Cache({
  ttl: BusinessRules.CACHE.WISHLIST_TTL,
  key: `wishlist:${wishlistId}`,
  tags: ['wishlist', wishlistId],
});

export const CacheProductSpecific = (productId: string) => Cache({
  ttl: BusinessRules.CACHE.PRODUCT_TTL,
  key: `product:${productId}`,
  tags: ['product', productId],
}); 