export interface IHealthRepository {
  checkConnection(): Promise<boolean>;
}

export class HealthRepository implements IHealthRepository {
  async checkConnection(): Promise<boolean> {
    return true;
  }
}
