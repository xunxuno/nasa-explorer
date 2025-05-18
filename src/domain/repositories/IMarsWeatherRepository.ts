// src/domain/repositories/IMarsWeatherRepository.ts
import { MarsSolWeather } from '../entities/MarsSolWeather';
export interface IMarsWeatherRepository {
  getLatest(): Promise<MarsSolWeather[]>;
}
