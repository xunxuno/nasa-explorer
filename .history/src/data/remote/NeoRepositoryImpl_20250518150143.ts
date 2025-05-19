import axios from 'axios';
import { INeoRepository } from '../../domain/repositories/INeoRepository';
import { NearEarthObject } from '../../domain/entities/NearEarthObject';

const apiKey = process.env.EXPO_PUBLIC_NASA_KEY ?? 'DEMO_KEY';
const client  = axios.create({ baseURL: 'https://api.nasa.gov/neo/rest/v1' });

export class NeoRepositoryImpl implements INeoRepository {
  async listByDate(dateISO: string): Promise<NearEarthObject[]> {
    const { data } = await client.get('/feed', {
      params: { start_date: dateISO, end_date: dateISO, api_key: apiKey },
    });

    const rawNEOs = data.near_earth_objects[dateISO] as any[];

    return rawNEOs.map(n => ({
      id: n.id,
      name: n.name,
      magnitude: n.absolute_magnitude_h,
      isHazardous: n.is_potentially_hazardous_asteroid,
      closeApproachDate: n.close_approach_data[0].close_approach_date,
      missDistanceKm: Number(n.close_approach_data[0].miss_distance.kilometers),
      velocityKms:    Number(n.close_approach_data[0].relative_velocity.kilometers_per_second),
    })) satisfies NearEarthObject[];
  }
}
