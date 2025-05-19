import { MarsSolWeather } from '../entities/MarsSolWeather';
export interface IMarsWeatherRepository {
  getLatest(): Promise<MarsSolWeather[]>;
}
