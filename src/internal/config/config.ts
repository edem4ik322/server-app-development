import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export interface AppConfig {
  appName: string;
  appEnv: string;
  appVersion: string;
  port: number;
}

export function loadConfig(): AppConfig {
  return {
    appName: process.env.APP_NAME || 'WMS Inventory Management API',
    appEnv: process.env.APP_ENV || 'development',
    appVersion: process.env.APP_VERSION || '1.0.0',
    port: parseInt(process.env.HTTP_PORT || '8080', 10),
  };
}
