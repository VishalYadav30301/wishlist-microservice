import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { BusinessRules, ValidationHelpers } from '../constants';

/**
 * Custom validator for wishlist item quantity
 */
export function IsValidQuantity(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidQuantity',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'number') return false;
          return ValidationHelpers.isValidQuantity(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be between ${BusinessRules.BUSINESS.MIN_QUANTITY_PER_ITEM} and ${BusinessRules.BUSINESS.MAX_QUANTITY_PER_ITEM}`;
        },
      },
    });
  };
}

/**
 * Custom validator for product price
 */
export function IsValidPrice(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidPrice',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'number') return false;
          return ValidationHelpers.isValidPrice(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be between ${BusinessRules.PRODUCT.MIN_PRICE} and ${BusinessRules.PRODUCT.MAX_PRICE}`;
        },
      },
    });
  };
}

/**
 * Custom validator for wishlist size
 */
export function IsValidWishlistSize(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidWishlistSize',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!Array.isArray(value)) return false;
          return ValidationHelpers.isValidWishlistSize(value.length);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} cannot exceed ${BusinessRules.WISHLIST.MAX_ITEMS} items`;
        },
      },
    });
  };
}

/**
 * Custom validator for string length
 */
export function IsValidStringLength(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidStringLength',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          return ValidationHelpers.isValidStringLength(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} length must be between ${BusinessRules.VALIDATION.MIN_STRING_LENGTH} and ${BusinessRules.VALIDATION.MAX_STRING_LENGTH} characters`;
        },
      },
    });
  };
}

/**
 * Custom validator for array length
 */
export function IsValidArrayLength(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidArrayLength',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!Array.isArray(value)) return false;
          return ValidationHelpers.isValidArrayLength(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} length must be between ${BusinessRules.VALIDATION.MIN_ARRAY_LENGTH} and ${BusinessRules.VALIDATION.MAX_ARRAY_LENGTH}`;
        },
      },
    });
  };
}

/**
 * Custom validator for page size
 */
export function IsValidPageSize(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidPageSize',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'number') return false;
          return ValidationHelpers.isValidPageSize(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be between ${BusinessRules.PAGINATION.MIN_PAGE_SIZE} and ${BusinessRules.PAGINATION.MAX_PAGE_SIZE}`;
        },
      },
    });
  };
}

/**
 * Custom validator for MongoDB ObjectId
 */
export function IsMongoId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMongoId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          // MongoDB ObjectId is 24 characters long and contains only hexadecimal characters
          return /^[0-9a-fA-F]{24}$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid MongoDB ObjectId`;
        },
      },
    });
  };
}

/**
 * Custom validator for email format
 */
export function IsValidEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          // Basic email validation regex
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid email address`;
        },
      },
    });
  };
}

/**
 * Custom validator for phone number format
 */
export function IsValidPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          // Basic phone number validation (allows +, digits, spaces, dashes, parentheses)
          const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
          return phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''));
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid phone number`;
        },
      },
    });
  };
}

/**
 * Custom validator for URL format
 */
export function IsValidUrl(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidUrl',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          try {
            new URL(value);
            return true;
          } catch {
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid URL`;
        },
      },
    });
  };
}

/**
 * Custom validator for date format (ISO 8601)
 */
export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          const date = new Date(value);
          return !isNaN(date.getTime());
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid date in ISO 8601 format`;
        },
      },
    });
  };
}

/**
 * Custom validator for future date
 */
export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          const date = new Date(value);
          const now = new Date();
          return !isNaN(date.getTime()) && date > now;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a future date`;
        },
      },
    });
  };
}

/**
 * Custom validator for past date
 */
export function IsPastDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPastDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          const date = new Date(value);
          const now = new Date();
          return !isNaN(date.getTime()) && date < now;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a past date`;
        },
      },
    });
  };
} 