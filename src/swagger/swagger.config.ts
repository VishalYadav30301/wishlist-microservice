import { SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { createSwaggerConfig } from './config';

export class SwaggerConfig {
  static setup(app: INestApplication, environment: string = 'development') {
    const config = createSwaggerConfig(environment).build();

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
  }
} 