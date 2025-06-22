import { SetMetadata } from '@nestjs/common';
import { BusinessRules } from '../constants';

export interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  max: number; // Maximum number of requests per window
  message?: string; // Custom error message
  skipSuccessfulRequests?: boolean; // Skip rate limiting for successful requests
  skipFailedRequests?: boolean; // Skip rate limiting for failed requests
}

export const RATE_LIMIT_KEY = 'rateLimit';

export const RateLimit = (options: RateLimitOptions) => SetMetadata(RATE_LIMIT_KEY, options);

// Predefined rate limit decorators
export const RateLimitStrict = () => RateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: BusinessRules.RATE_LIMITS.REQUESTS_PER_MINUTE,
  message: 'Too many requests, please try again later.',
});

export const RateLimitModerate = () => RateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: BusinessRules.RATE_LIMITS.REQUESTS_PER_MINUTE * 2,
  message: 'Too many requests, please try again later.',
});

export const RateLimitLoose = () => RateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: BusinessRules.RATE_LIMITS.REQUESTS_PER_MINUTE * 5,
  message: 'Too many requests, please try again later.',
});

export const RateLimitBurst = () => RateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: BusinessRules.RATE_LIMITS.BURST_LIMIT,
  message: 'Burst limit exceeded, please slow down.',
});

export const RateLimitHourly = () => RateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: BusinessRules.RATE_LIMITS.REQUESTS_PER_HOUR,
  message: 'Hourly rate limit exceeded, please try again later.',
});

export const RateLimitDaily = () => RateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: BusinessRules.RATE_LIMITS.REQUESTS_PER_DAY,
  message: 'Daily rate limit exceeded, please try again tomorrow.',
}); 