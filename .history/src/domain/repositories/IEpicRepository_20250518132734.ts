export interface IEpicRepository {
  getImages(date: string): Promise<string[]>;
}
