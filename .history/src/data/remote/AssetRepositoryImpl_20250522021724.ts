import axios from 'axios'; // Importación de axios para realizar peticiones HTTP
import { IAssetRepository } from '../../domain/repositories/IAssetRepository';
import { NasaAsset } from '../../domain/entities/NasaAsset';

const client = axios.create({ baseURL: 'https://images-api.nasa.gov' });

export class AssetRepositoryImpl implements IAssetRepository { // Implementación concreta del repositorio de assets que cumple con la interfaz IAssetRepository
  /**
   * Busca assets en la API de NASA Images
   * param query Términos de búsqueda
   * param mediaType Tipo de medio a filtrar (opcional)
   * param page Número de página para paginación
   * returns Objeto con array de items NasaAsset y total de resultados
   */
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
        dateCreated: it.data[0].date_created,  // Si no hay items, devuelve array vacío
      })) ?? [];

    return { items, total: data.collection.metadata.total_hits ?? 0 }; // Total de resultados disponibles
  }
}
