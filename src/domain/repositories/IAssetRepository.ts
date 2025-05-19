import { NasaAsset } from '../entities/NasaAsset';

export interface IAssetRepository {
  search(
    query: string,
    mediaType: string | undefined,
    page: number
  ): Promise<{ items: NasaAsset[]; total: number }>;
}
