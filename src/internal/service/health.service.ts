import { AppConfig } from '../config/config';
import { IHealthRepository } from '../repository/health.repository';

/**
 * Формат ответа Health Check согласно спецификации Лабораторной работы №3
 */
export interface HealthStatus {
  status: 'pass' | 'fail';
  app_name: string;
  version: string;
  environment: string;
}

/**
 * Интерфейс сервиса здоровья (Dependency Inversion)
 */
export interface IHealthService {
  getHealth(): Promise<HealthStatus>;
}

/**
 * Слой бизнес-логики (Domain / Service Layer)
 * Не знает деталей HTTP (Request/Response) и работает только с чистыми данными.
 */
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
