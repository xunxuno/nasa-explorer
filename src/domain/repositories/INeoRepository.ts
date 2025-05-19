import { NearEarthObject } from '../entities/NearEarthObject';

export interface INeoRepository {
  listByDate(dateISO: string): Promise<NearEarthObject[]>;
}
