import axios from 'axios';
import { IAssetRepository } from '../../domain/repositories/IAssetRepository';
import { NasaAsset } from '../../domain/entities/NasaAsset';

const client = axios.create({ baseURL: 'https://images-api.nasa.gov' });

export class AssetRepositoryImpl implements IAssetRepository {
  async search(query: string, mediaType: string | undefined, page: number) {
    const { data } = await client.get('/search', {
      params: { q: query, media_type: mediaType, page },
    });

    const items: NasaAsset[] =
      data.collection.items.map((it: any) => ({
        nasaId: it.data[0].nasa_id,
        title: it.data[0].title,
        description: it.data[0].description,
        mediaType: it.data[0].media_type,
        thumbUrl: it.links?.[0]?.href ?? '',
        previewUrl: it.links?.find((l: any) => l.render === 'image')?.href ?? '',
        dateCreated: it.data[0].date_created,
      })) ?? [];

    return { items, total: data.collection.metadata.total_hits ?? 0 };
  }
}
