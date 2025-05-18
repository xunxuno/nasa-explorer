import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import dayjs from 'dayjs';
import { fetchEpicImagesRemote } from './remote/epicRemoteDataSource';
import { IEpicRepository } from '../domain/repositories/IEpicRepository';

const CACHE_PREFIX = '@epic_'; // clave: @epic_YYYY-MM-DD

export class EpicRepositoryImpl implements IEpicRepository {
  /** Obtiene URLs JPG para una fecha (YYYY-MM-DD). */
  async getImages(date: string): Promise<string[]> {
    const cacheKey = `${CACHE_PREFIX}${date}`;

    const { isConnected } = await NetInfo.fetch();

    // --- Online: intenta red y guarda en caché ---
    if (isConnected) {
      try {
        const urls = await fetchEpicImagesRemote(date);

        // guarda { data: string[], timestamp } para invalidación futura
        const payload = JSON.stringify({
          ts: dayjs().toISOString(),
          urls,
        });
        await AsyncStorage.setItem(cacheKey, payload);

        return urls;
      } catch (err) {
        console.warn('EPIC remote error, trying cache →', err);
        // si falla red, aún podemos bajar a cache
      }
    }

    // --- Offline o fallo de red: lee caché ---
    const cached = await AsyncStorage.getItem(cacheKey);
    if (cached) {
      const { urls } = JSON.parse(cached) as { ts: string; urls: string[] };
      return urls;
    }

    throw new Error('Sin conexión y sin datos EPIC en caché');
  }
}
