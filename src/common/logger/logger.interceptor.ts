import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CustomLoggerService } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('LoggingInterceptor');

  constructor(private readonly customLogger: CustomLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const className = context.getClass().name;
    const methodName = context.getHandler().name;
    const requestId = (request as any).requestId;
    const userId = (request as any).user?.entityId;

    const start = Date.now();

    this.customLogger.debug(`Starting ${className}.${methodName}`, {
      service: 'wishlist-service',
      method: `${className}.${methodName}`,
      requestId,
      userId,
      httpMethod: method,
      url,
    });

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - start;
        
        this.customLogger.logPerformance(
          `${className}.${methodName}`,
          duration,
          'ms',
          {
            service: 'wishlist-service',
            method: `${className}.${methodName}`,
            requestId,
            userId,
            httpMethod: method,
            url,
            success: true,
          }
        );

        this.customLogger.debug(`Completed ${className}.${methodName}`, {
          service: 'wishlist-service',
          method: `${className}.${methodName}`,
          requestId,
          userId,
          duration,
          responseSize: JSON.stringify(data).length,
        });
      }),
      catchError((error) => {
        const duration = Date.now() - start;
        
        this.customLogger.error(
          `Error in ${className}.${methodName}: ${error.message}`,
          {
            service: 'wishlist-service',
            method: `${className}.${methodName}`,
            requestId,
            userId,
            httpMethod: method,
            url,
            duration,
            errorCode: error.code,
            errorStack: error.stack,
          },
          error.stack
        );

        throw error;
      })
    );
  }
} 