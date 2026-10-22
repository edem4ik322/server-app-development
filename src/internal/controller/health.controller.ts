import { Request, Response } from 'express';
import { IHealthService } from '../service/health.service';

export class HealthController {
  private healthService: IHealthService;

  constructor(healthService: IHealthService) {
    this.healthService = healthService;
  }

  getHealth = async (_req: Request, res: Response): Promise<void> => {
    try {
      const healthData = await this.healthService.getHealth();
      res.status(200).json(healthData);
    } catch (error) {
      res.status(500).json({
        code: 'INTERNAL_ERROR',
        message: 'Не удалось получить статус работоспособности сервиса',
      });
    }
  };
}
