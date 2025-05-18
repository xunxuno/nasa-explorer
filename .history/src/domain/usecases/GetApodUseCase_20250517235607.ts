import { IApodRepository } from '../repositories/IApodRepository';
export class GetApodUseCase {
  constructor(private repo: IApodRepository) {}
  execute() {
    return this.repo.getApod();
  }
}
