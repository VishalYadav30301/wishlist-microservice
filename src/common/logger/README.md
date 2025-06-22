# Centralized Logging System

This folder contains a comprehensive logging system for the Wishlist Microservice that provides centralized log management, structured logging, and performance monitoring.

## Structure

```
logger/
├── README.md                    # This documentation file
├── index.ts                     # Main exports
├── logger.service.ts            # Custom logger service
├── logger.middleware.ts         # HTTP request/response logging
├── logger.interceptor.ts        # Method execution logging
├── logger.module.ts             # Logger module configuration
└── logger.config.ts             # Environment-based configuration
```

## Features

### 🎯 **Centralized Management**
- All logging operations managed from one service
- Consistent log format across the application
- Environment-based configuration

### 📊 **Structured Logging**
- Context-aware logging with metadata
- Request ID tracking for request tracing
- User ID tracking for user-specific logs
- Performance metrics logging

### 🔧 **Multiple Log Levels**
- `error` - For errors and exceptions
- `warn` - For warnings and potential issues
- `log` - For general information
- `debug` - For debugging information (development only)
- `verbose` - For detailed debugging (development only)

### 🌍 **Environment Support**
- Different configurations for dev/staging/production
- External logging service integration
- File logging support
- Console logging control

## Usage

### 1. Basic Usage

```typescript
import { CustomLoggerService } from '../common/logger';

@Injectable()
export class YourService {
  constructor(private readonly logger: CustomLoggerService) {}

  async someMethod() {
    this.logger.log('Operation started', {
      service: 'wishlist-service',
      method: 'YourService.someMethod',
    });
  }
}
```

### 2. Logging with Context

```typescript
this.logger.log('User action performed', {
  service: 'wishlist-service',
  method: 'WishlistController.addItem',
  userId: 'user123',
  requestId: 'req456',
  productId: 'prod789',
});
```

### 3. Error Logging

```typescript
try {
  // Some operation
} catch (error) {
  this.logger.error('Operation failed', {
    service: 'wishlist-service',
    method: 'YourService.someMethod',
    error: error.message,
  }, error.stack);
}
```

### 4. Performance Logging

```typescript
this.logger.logPerformance('Database query', 150, 'ms', {
  service: 'wishlist-service',
  method: 'WishlistService.getWishlist',
  collection: 'wishlists',
});
```

### 5. Business Event Logging

```typescript
this.logger.logBusinessEvent('Item added to wishlist', {
  userId: 'user123',
  productId: 'prod789',
  quantity: 1,
}, {
  service: 'wishlist-service',
  method: 'WishlistController.addItem',
});
```

## Available Methods

### Basic Logging
- `log(message, context?)` - Standard logging
- `error(message, context?, trace?)` - Error logging
- `warn(message, context?)` - Warning logging
- `debug(message, context?)` - Debug logging (dev only)
- `verbose(message, context?)` - Verbose logging (dev only)

### Specialized Logging
- `logRequest(method, url, duration, statusCode, context?)` - HTTP request logging
- `logDatabase(operation, collection, duration, context?)` - Database operation logging
- `logExternalService(service, operation, duration, success, context?)` - External service logging
- `logAuth(event, userId?, success?, context?)` - Authentication event logging
- `logBusinessEvent(event, details, context?)` - Business logic event logging
- `logPerformance(metric, value, unit?, context?)` - Performance metric logging

## Configuration

### Environment-Based Configuration

```typescript
// Development
{
  level: 'debug',
  enableConsole: true,
  enableFile: false,
  enableExternal: false,
}

// Staging
{
  level: 'log',
  enableConsole: true,
  enableFile: true,
  enableExternal: true,
  filePath: './logs/wishlist-service.log',
  maxFileSize: '10m',
  maxFiles: 5,
}

// Production
{
  level: 'warn',
  enableConsole: false,
  enableFile: true,
  enableExternal: true,
  filePath: './logs/wishlist-service.log',
  maxFileSize: '10m',
  maxFiles: 10,
}
```

### Environment Variables

```bash
# Logging service configuration
LOGGING_SERVICE_URL=https://logs.example.com
LOGGING_SERVICE_API_KEY=your-api-key
NODE_ENV=development
```

## Middleware and Interceptors

### LoggingMiddleware
Automatically logs all HTTP requests and responses with:
- Request method and URL
- Response status code
- Request duration
- User ID (if authenticated)
- Request ID for tracing

### LoggingInterceptor
Logs method execution details including:
- Method start and completion
- Execution duration
- Success/failure status
- Error details if applicable

## Integration

### 1. Add to App Module

```typescript
import { LoggerModule } from './common/logger';

@Module({
  imports: [
    // ... other imports
    LoggerModule,
  ],
})
export class AppModule {}
```

### 2. Use in Controllers/Services

```typescript
import { CustomLoggerService } from '../common/logger';

@Injectable()
export class YourService {
  constructor(private readonly logger: CustomLoggerService) {}
  
  // Use logger methods
}
```

### 3. Global Usage

The logger is available globally, so you can inject it anywhere:

```typescript
@Controller('wishlist')
export class WishlistController {
  constructor(
    private readonly wishlistService: WishlistService,
    private readonly logger: CustomLoggerService, // Available globally
  ) {}
}
```

## Log Format

### Standard Log Format
```
[Service: wishlist-service | Method: WishlistController.getWishlist | User: user123 | Request: req456] Your log message
```

### Error Log Format
```
[Service: wishlist-service | Method: YourService.someMethod | Error: Database connection failed] Error message
Error stack trace...
```

### Performance Log Format
```
[Service: wishlist-service | Method: Database.query | Duration: 150ms] Performance: Database query - 150ms
```

## External Logging Services

The system supports integration with external logging services:

- **CloudWatch** - AWS CloudWatch integration
- **DataDog** - DataDog logging
- **Splunk** - Splunk integration
- **Custom** - Custom logging service

Configure via environment variables:
```bash
LOGGING_SERVICE_URL=https://your-logging-service.com
LOGGING_SERVICE_API_KEY=your-api-key
```

## Best Practices

1. **Use Context**: Always provide relevant context for better debugging
2. **Log Levels**: Use appropriate log levels (error, warn, log, debug, verbose)
3. **Performance**: Log performance metrics for slow operations
4. **Security**: Don't log sensitive information (passwords, tokens)
5. **Consistency**: Use consistent naming for services and methods
6. **Request Tracing**: Include requestId for request tracing
7. **User Context**: Include userId when available for user-specific logs

## Monitoring and Alerting

The logging system can be extended to support:
- Performance monitoring
- Error rate tracking
- User activity monitoring
- Business metrics tracking
- Automated alerting

## Troubleshooting

### Common Issues

1. **Logger not injected**: Ensure LoggerModule is imported in AppModule
2. **No logs in production**: Check log level configuration
3. **Missing context**: Verify context object structure
4. **Performance issues**: Monitor log volume and external service calls

### Debug Mode

Enable debug logging in development:
```typescript
// In your service
this.logger.debug('Debug information', { context: 'debug' });
```

## Future Enhancements

1. **Log Aggregation**: Centralized log collection
2. **Real-time Monitoring**: Live log monitoring dashboard
3. **Log Analytics**: Advanced log analysis and reporting
4. **Custom Formatters**: Custom log format support
5. **Log Retention**: Automated log cleanup and retention policies 