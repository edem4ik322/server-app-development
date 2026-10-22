import { AppConfig } from '../config/config';
import { IHealthRepository } from '../repository/health.repository';

export interface HealthStatus {
  status: 'pass' | 'fail';
  app_name: string;
  version: string;
  environment: string;
}

export interface IHealthService {
  getHealth(): Promise<HealthStatus>;
}

export class HealthService implements IHealthService {
  private config: AppConfig;
  private healthRepo: IHealthRepository;

  constructor(config: AppConfig, healthRepo: IHealthRepository) {
    this.config = config;
    this.healthRepo = healthRepo;
  }

  async getHealth(): Promise<HealthStatus> {
    const isDbReady = await this.healthRepo.checkConnection();

    return {
      status: isDbReady ? 'pass' : 'fail',
      app_name: this.config.appName,
      version: this.config.appVersion,
      environment: this.config.appEnv,
    };
  }
}
