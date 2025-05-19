import { INeoRepository } from '../repositories/INeoRepository';

export class GetNeosByDateUseCase {
  constructor(private repo: INeoRepository) {}
  execute(dateISO: string) {
    return this.repo.listByDate(dateISO);
  }
}
