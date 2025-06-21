import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { AppModule } from './app.module';
import * as compression from 'compression';
import helmet from 'helmet';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

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
    const config = new DocumentBuilder()
      .setTitle('Wishlist Microservice API')
      .setDescription(`
        The Wishlist Microservice API provides endpoints for managing wishlists.
        ## Features
        - Get wishlist details
        - Add items to wishlist
        - Remove items from wishlist
        - Clear wishlist
        - Add items to cart
      `)
      .setVersion('1.0')
      .addTag('wishlist', 'Wishlist management endpoints')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
        docExpansion: 'none',
        filter: true,
        showRequestDuration: true,
      },
      customSiteTitle: 'Wishlist Microservice API Documentation',
    });

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
