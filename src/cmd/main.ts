import express from 'express';
import { loadConfig } from '../internal/config/config';
import { HealthRepository } from '../internal/repository/health.repository';
import { HealthService } from '../internal/service/health.service';
import { HealthController } from '../internal/controller/health.controller';

function bootstrap() {
  const config = loadConfig();

  const healthRepository = new HealthRepository();
  const healthService = new HealthService(config, healthRepository);
  const healthController = new HealthController(healthService);

  const app = express();
  app.use(express.json());

  app.get('/api/v1/health', healthController.getHealth);
  app.get('/health', healthController.getHealth);

  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}

bootstrap();
