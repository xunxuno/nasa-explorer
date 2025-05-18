// src/data/MarsWeatherRepositoryImpl.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { fetchMarsWeatherRemote } from './remote/insightRemoteDataSource';
import { MarsSolWeather } from '../domain/entities/MarsSolWeather';
import { IMarsWeatherRepository } from '../domain/repositories/IMarsWeatherRepository';

const CACHE_KEY = '@mars_weather';

export class MarsWeatherRepositoryImpl implements IMarsWeatherRepository {
  async getLatest(): Promise<MarsSolWeather[]> {
    const { isConnected } = await NetInfo.fetch();
    if (isConnected) {
      try {
        const sols = await fetchMarsWeatherRemote();
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(sols));
        return sols;
      } catch (e) {
        console.warn('InSight API error, falling back to cache', e);
      }
    }
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached) return JSON.parse(cached);
    throw new Error('Sin conexión y sin caché de clima marciano');
  }
}
