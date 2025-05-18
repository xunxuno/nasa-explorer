import { IApodRepository } from '../repositories/IApodRepository';
export class GetApodUseCase {
  constructor(private repo: IApodRepository) {}
execute(date?: string) {
  return this.repo.getApod(date);
  }
}
