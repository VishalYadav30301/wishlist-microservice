import { Injectable, Logger, LoggerService } from '@nestjs/common';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  LOG = 'log',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

export interface LogContext {
  service?: string;
  method?: string;
  userId?: string;
  requestId?: string;
  [key: string]: any;
}

@Injectable()
export class CustomLoggerService implements LoggerService {
  private readonly logger = new Logger('WishlistService');
  private readonly isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Log an error message
   */
  error(message: string, context?: LogContext, trace?: string): void {
    const formattedMessage = this.formatMessage(message, context);
    this.logger.error(formattedMessage, trace);
    
    // In production, you might want to send to external logging service
    if (!this.isDevelopment) {
      this.sendToExternalService('error', formattedMessage, context, trace);
    }
  }

  /**
   * Log a warning message
   */
  warn(message: string, context?: LogContext): void {
    const formattedMessage = this.formatMessage(message, context);
    this.logger.warn(formattedMessage);
  }

  /**
   * Log a standard message
   */
  log(message: string, context?: LogContext): void {
    const formattedMessage = this.formatMessage(message, context);
    this.logger.log(formattedMessage);
  }

  /**
   * Log a debug message (only in development)
   */
  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      const formattedMessage = this.formatMessage(message, context);
      this.logger.debug(formattedMessage);
    }
  }

  /**
   * Log a verbose message (only in development)
   */
  verbose(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      const formattedMessage = this.formatMessage(message, context);
      this.logger.verbose(formattedMessage);
    }
  }

  /**
   * Log API request details
   */
  logRequest(method: string, url: string, duration: number, statusCode: number, context?: LogContext): void {
    const message = `${method} ${url} ${statusCode} - ${duration}ms`;
    const requestContext = {
      ...context,
      method,
      url,
      duration,
      statusCode,
    };

    if (statusCode >= 400) {
      this.warn(message, requestContext);
    } else {
      this.log(message, requestContext);
    }
  }

  /**
   * Log database operations
   */
  logDatabase(operation: string, collection: string, duration: number, context?: LogContext): void {
    const message = `DB ${operation} on ${collection} - ${duration}ms`;
    const dbContext = {
      ...context,
      operation,
      collection,
      duration,
    };

    if (duration > 1000) { // Log slow queries as warnings
      this.warn(message, dbContext);
    } else {
      this.debug(message, dbContext);
    }
  }

  /**
   * Log external service calls
   */
  logExternalService(service: string, operation: string, duration: number, success: boolean, context?: LogContext): void {
    const status = success ? 'SUCCESS' : 'FAILED';
    const message = `External ${service} ${operation} - ${status} - ${duration}ms`;
    const serviceContext = {
      ...context,
      service,
      operation,
      duration,
      success,
    };

    if (success) {
      this.debug(message, serviceContext);
    } else {
      this.warn(message, serviceContext);
    }
  }

  /**
   * Log authentication events
   */
  logAuth(event: string, userId?: string, success: boolean = true, context?: LogContext): void {
    const status = success ? 'SUCCESS' : 'FAILED';
    const message = `Auth ${event} - ${status}${userId ? ` - User: ${userId}` : ''}`;
    const authContext = {
      ...context,
      event,
      userId,
      success,
    };

    if (success) {
      this.log(message, authContext);
    } else {
      this.warn(message, authContext);
    }
  }

  /**
   * Log business logic events
   */
  logBusinessEvent(event: string, details: any, context?: LogContext): void {
    const message = `Business Event: ${event}`;
    const businessContext = {
      ...context,
      event,
      details,
    };

    this.log(message, businessContext);
  }

  /**
   * Log performance metrics
   */
  logPerformance(metric: string, value: number, unit: string = 'ms', context?: LogContext): void {
    const message = `Performance: ${metric} - ${value}${unit}`;
    const perfContext = {
      ...context,
      metric,
      value,
      unit,
    };

    if (value > 1000) { // Log slow operations as warnings
      this.warn(message, perfContext);
    } else {
      this.debug(message, perfContext);
    }
  }

  /**
   * Format message with context
   */
  private formatMessage(message: string, context?: LogContext): string {
    if (!context) {
      return message;
    }

    const contextParts: string[] = [];
    
    if (context.service) {
      contextParts.push(`Service: ${context.service}`);
    }
    
    if (context.method) {
      contextParts.push(`Method: ${context.method}`);
    }
    
    if (context.userId) {
      contextParts.push(`User: ${context.userId}`);
    }
    
    if (context.requestId) {
      contextParts.push(`Request: ${context.requestId}`);
    }

    // Add any additional context properties
    Object.keys(context).forEach(key => {
      if (!['service', 'method', 'userId', 'requestId'].includes(key)) {
        contextParts.push(`${key}: ${context[key]}`);
      }
    });

    const contextString = contextParts.length > 0 ? ` [${contextParts.join(' | ')}]` : '';
    return `${message}${contextString}`;
  }

  /**
   * Send logs to external service (e.g., CloudWatch, DataDog, etc.)
   */
  private sendToExternalService(level: string, message: string, context?: LogContext, trace?: string): void {
    // Implementation for external logging service
    // This is a placeholder - implement based on your logging service
    const logData = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      trace,
      service: 'wishlist-microservice',
      environment: process.env.NODE_ENV || 'development',
    };

    // Example: Send to external service
    // await this.externalLoggingService.send(logData);
    
    // For now, just log to console in production
    console.log(JSON.stringify(logData));
  }

  /**
   * Get logger instance for specific context
   */
  getLogger(context: string): Logger {
    return new Logger(context);
  }
} 