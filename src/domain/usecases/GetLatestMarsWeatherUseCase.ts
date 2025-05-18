// src/domain/usecases/GetLatestMarsWeatherUseCase.ts
import { IMarsWeatherRepository } from '../repositories/IMarsWeatherRepository';
export class GetLatestMarsWeatherUseCase {
  constructor(private repo: IMarsWeatherRepository) {}
  execute() {
    return this.repo.getLatest();
  }
}
