import NetInfo from '@react-native-community/netinfo';
import { IApodRepository } from '../domain/repositories/IApodRepository';
import { Apod } from '../domain/entities/Apod';
import { fetchApodRemote } from './remote/apodRemoteDataSource';
import { getApodLocal, saveApodLocal } from './local/apodLocalDataSource';

export class ApodRepositoryImpl implements IApodRepository {
  async getApod(): Promise<Apod> {
    const { isConnected } = await NetInfo.fetch();
    if (isConnected) {
      const apod = await fetchApodRemote();
      await saveApodLocal(apod);
      return apod;
    }
    const cached = await getApodLocal();
    if (!cached) throw new Error('Sin conexión y sin caché');
    return cached;
  }
}
