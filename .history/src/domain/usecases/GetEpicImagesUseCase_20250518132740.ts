import { IEpicRepository } from '../repositories/IEpicRepository';

export class GetEpicImagesUseCase {
  constructor(private repo: IEpicRepository) {}

  /** Ejecuta la lógica: devuelve URLs JPG para la fecha dada. */
  execute(date: string) {
    return this.repo.getImages(date);
  }
}
