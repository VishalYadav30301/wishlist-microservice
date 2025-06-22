import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { AppModule } from './app.module';
import * as compression from 'compression';
import helmet from 'helmet';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SwaggerConfig } from './swagger';
import { CustomLoggerService } from './common/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Get the custom logger service
  const logger = app.get(CustomLoggerService);

  try {
    logger.log('Starting Wishlist Microservice', {
      service: 'wishlist-service',
      method: 'bootstrap',
      environment: process.env.NODE_ENV || 'development',
    });

    // Security and performance middleware
    app.use(helmet());
    app.use(compression());

    // CORS configuration
    app.enableCors({});

    // Global filters and pipes
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
        errorHttpStatusCode: 422,
      }),
    );

    // Swagger documentation setup
    const environment = process.env.NODE_ENV || 'development';
    SwaggerConfig.setup(app, environment);

    const port = process.env.PORT as string; 
    await app.listen(port);

    logger.log('Wishlist Microservice started successfully', {
      service: 'wishlist-service',
      method: 'bootstrap',
      port,
      environment,
    });

    // Create gRPC microservice
    const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        package: 'wishlist',
        protoPath: join(__dirname, './proto/wishlist.proto'),
        url: process.env.WISHLIST_SERVICE_URL
      },
    });
    
    grpcApp.listen().then(() => {
      logger.log('Wishlist gRPC microservice is listening', {
        service: 'wishlist-service',
        method: 'bootstrap',
        transport: 'gRPC',
        url: process.env.WISHLIST_SERVICE_URL,
      });
    });
  } catch (error) {
    logger.error('Failed to start application', {
      service: 'wishlist-service',
      method: 'bootstrap',
      error: error.message,
    }, error.stack);
    process.exit(1);
  }
}

bootstrap();
