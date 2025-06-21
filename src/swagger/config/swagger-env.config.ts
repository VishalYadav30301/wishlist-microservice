import { DocumentBuilder } from '@nestjs/swagger';

export interface SwaggerEnvironmentConfig {
  title: string;
  description: string;
  version: string;
  contact?: {
    name: string;
    email: string;
    url: string;
  };
  license?: {
    name: string;
    url: string;
  };
  servers?: Array<{
    url: string;
    description: string;
  }>;
}

export const SwaggerEnvironmentConfigs: Record<string, SwaggerEnvironmentConfig> = {
  development: {
    title: 'Wishlist Microservice API (Development)',
    description: `
      The Wishlist Microservice API provides endpoints for managing wishlists.
      
      ## Features
      - Get wishlist details
      - Add items to wishlist
      - Remove items from wishlist
      - Clear wishlist
      - Add items to cart
      
      ## Development Environment
      This is the development version of the API. Use this for testing and development purposes.
    `,
    version: '1.0.0-dev',
    contact: {
      name: 'Development Team',
      email: 'vishal.yadav@appinventiv.com',
      url: 'https://github.com/VishalYadav30301/wishlist-microservice',
    },
    servers: [
      {
        url: 'http://localhost:3005',
        description: 'Development server',
      },
      {
        url: 'http://localhost:3009',
        description: 'Alternative development server',
      },
    ],
  },

  staging: {
    title: 'Wishlist Microservice API (Staging)',
    description: `
      The Wishlist Microservice API provides endpoints for managing wishlists.
      
      ## Features
      - Get wishlist details
      - Add items to wishlist
      - Remove items from wishlist
      - Clear wishlist
      - Add items to cart
      
      ## Staging Environment
      This is the staging version of the API. Use this for pre-production testing.
    `,
    version: '1.0.0-staging',
    contact: {
      name: 'QA Team',
      email: 'qa@example.com',
      url: 'https://staging.example.com',
    },
    servers: [
      {
        url: 'https://staging-api.example.com',
        description: 'Staging server',
      },
    ],
  },

  production: {
    title: 'Wishlist Microservice API',
    description: `
      The Wishlist Microservice API provides endpoints for managing wishlists.
      
      ## Features
      - Get wishlist details
      - Add items to wishlist
      - Remove items from wishlist
      - Clear wishlist
      - Add items to cart
      
      ## Production Environment
      This is the production version of the API. Use this for live applications.
    `,
    version: '1.0.0',
    contact: {
      name: 'Support Team',
      email: 'support@example.com',
      url: 'https://example.com/support',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    servers: [
      {
        url: 'https://api.example.com',
        description: 'Production server',
      },
    ],
  },
};

export function createSwaggerConfig(environment: string = 'development'): DocumentBuilder {
  const config = SwaggerEnvironmentConfigs[environment] || SwaggerEnvironmentConfigs.development;
  
  const documentBuilder = new DocumentBuilder()
    .setTitle(config.title)
    .setDescription(config.description)
    .setVersion(config.version);

  if (config.contact) {
    documentBuilder.setContact(
      config.contact.name,
      config.contact.url,
      config.contact.email
    );
  }

  if (config.license) {
    documentBuilder.setLicense(config.license.name, config.license.url);
  }

  if (config.servers) {
    config.servers.forEach(server => {
      documentBuilder.addServer(server.url, server.description);
    });
  }

  return documentBuilder
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
    );
} 