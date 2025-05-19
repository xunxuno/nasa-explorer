import { IAssetRepository } from '../repositories/IAssetRepository';

export class SearchAssetsUseCase {
  constructor(private repo: IAssetRepository) {}
  execute(q: string, media: string | undefined, page: number) {
    return this.repo.search(q, media, page);
  }
}
