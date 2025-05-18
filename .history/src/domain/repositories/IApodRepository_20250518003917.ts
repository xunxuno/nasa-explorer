import { Apod } from '../entities/Apod';
export interface IApodRepository {
  getApod(date?: string): Promise<Apod>;
}
