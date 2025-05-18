import { Apod } from '../entities/Apod';
export interface IApodRepository {
  getApod(): Promise<Apod>;
}
