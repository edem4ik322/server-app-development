/**
 * Data Access Layer (Слой работы с данными / Репозиторий)
 * 
 * В рамках Лабораторной работы №3 закладывает фундамент для будущей
 * интеграции с PostgreSQL (ЛР5 и ЛР6).
 */

export interface IHealthRepository {
  /**
   * Проверка доступности хранилища данных
   */
  checkConnection(): Promise<boolean>;
}

export class HealthRepository implements IHealthRepository {
  /**
   * На данном этапе возвращает готовность слоя данных (mock)
   */
  async checkConnection(): Promise<boolean> {
    // В будущих лабах здесь будет реальный пинг базы данных: SELECT 1
    return true;
  }
}
