import { IEpicRepository } from '../repositories/IEpicRepository';

export class GetEpicImagesUseCase {
  constructor(private repo: IEpicRepository) {}


  execute(date: string) {
    return this.repo.getImages(date);
  }
}
