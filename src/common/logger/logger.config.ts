export interface LoggerConfig {
  level: string;
  enableConsole: boolean;
  enableFile: boolean;
  enableExternal: boolean;
  filePath?: string;
  maxFileSize?: string;
  maxFiles?: number;
  externalService?: {
    url: string;
    apiKey: string;
    service: 'cloudwatch' | 'datadog' | 'splunk' | 'custom';
  };
}

export const LoggerConfigs: Record<string, LoggerConfig> = {
  development: {
    level: 'debug',
    enableConsole: true,
    enableFile: false,
    enableExternal: false,
  },

  staging: {
    level: 'log',
    enableConsole: true,
    enableFile: true,
    enableExternal: true,
    filePath: './logs/wishlist-service.log',
    maxFileSize: '10m',
    maxFiles: 5,
    externalService: {
      url: process.env.LOGGING_SERVICE_URL || '',
      apiKey: process.env.LOGGING_SERVICE_API_KEY || '',
      service: 'cloudwatch',
    },
  },

  production: {
    level: 'warn',
    enableConsole: false,
    enableFile: true,
    enableExternal: true,
    filePath: './logs/wishlist-service.log',
    maxFileSize: '10m',
    maxFiles: 10,
    externalService: {
      url: process.env.LOGGING_SERVICE_URL || '',
      apiKey: process.env.LOGGING_SERVICE_API_KEY || '',
      service: 'cloudwatch',
    },
  },
};

export function getLoggerConfig(environment: string = 'development'): LoggerConfig {
  return LoggerConfigs[environment] || LoggerConfigs.development;
} 