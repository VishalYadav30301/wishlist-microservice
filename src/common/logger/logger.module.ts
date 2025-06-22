import { Module, Global } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';
import { LoggingMiddleware } from './logger.middleware';
import { LoggingInterceptor } from './logger.interceptor';

@Global()
@Module({
  providers: [
    CustomLoggerService,
    LoggingMiddleware,
    LoggingInterceptor,
  ],
  exports: [
    CustomLoggerService,
    LoggingMiddleware,
    LoggingInterceptor,
  ],
})
export class LoggerModule {} 