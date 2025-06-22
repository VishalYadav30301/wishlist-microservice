import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from './logger.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLoggerService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();
    const requestId = uuidv4();
    
    // Add request ID to request object for tracking
    (req as any).requestId = requestId;
    
    // Log incoming request
    this.logger.log('Incoming request', {
      service: 'wishlist-service',
      method: req.method,
      url: req.url,
      requestId,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      userId: (req as any).user?.entityId,
    });

    // Override res.end to capture response details
    const originalEnd = res.end;
    res.end = function(chunk?: any, encoding?: any): Response {
      const duration = Date.now() - start;
      
      // Log response
      this.logger.logRequest(
        req.method,
        req.url,
        duration,
        res.statusCode,
        {
          service: 'wishlist-service',
          requestId,
          userId: (req as any).user?.entityId,
          responseSize: chunk ? chunk.length : 0,
        }
      );

      // Call original end method
      return originalEnd.call(this, chunk, encoding);
    }.bind(this);

    next();
  }
} 