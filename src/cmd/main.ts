import express from 'express';
import { loadConfig } from '../internal/config/config';
import { HealthRepository } from '../internal/repository/health.repository';
import { HealthService } from '../internal/service/health.service';
import { HealthController } from '../internal/controller/health.controller';

/**
 * Точка входа в приложение (Main Entry Point)
 * Сборка зависимостей (Composition Root) и запуск HTTP-сервера.
 */
function bootstrap() {
  // 1. Загрузка конфигурации из переменных окружения
  const config = loadConfig();

  // 2. Инициализация слоев (Dependency Injection)
  const healthRepository = new HealthRepository();
  const healthService = new HealthService(config, healthRepository);
  const healthController = new HealthController(healthService);

  // 3. Создание и настройка веб-сервера Express
  const app = express();
  app.use(express.json());

  // 4. Регистрация маршрутов
  // Основной эндпоинт проверки здоровья (по ТЗ: GET /api/v1/health)
  app.get('/api/v1/health', healthController.getHealth);
  // Дополнительный алиас для удобства: GET /health
  app.get('/health', healthController.getHealth);

  // 5. Запуск прослушивания порта
  app.listen(config.port, () => {
    console.log('====================================================');
    console.log(`🚀 ${config.appName} запущен!`);
    console.log(`📡 Окружение: ${config.appEnv}`);
    console.log(`🌐 Порт: ${config.port}`);
    console.log(`🩺 Health check: http://localhost:${config.port}/api/v1/health`);
    console.log('====================================================');
  });
}

bootstrap();
