import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { AppModule } from './app.module';
import * as compression from 'compression';
import helmet from 'helmet';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SwaggerConfig } from './swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
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

    // Request logging middleware
    app.use((req, res, next) => {
      const start = Date.now();
      res.on('finish', () => {
        const duration = Date.now() - start;
        logger.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
      });
      next();
    });

    // Swagger documentation setup
    const environment = process.env.NODE_ENV || 'development';
    SwaggerConfig.setup(app, environment);

    const port = process.env.PORT as string; 
    await app.listen(port);
console.log(join(__dirname, './proto/wishlist.proto'), 'hi');
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
      logger.log('Wishlist gRPC microservice is listening');
    });
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();
