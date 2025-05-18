export interface Apod {
  date: string;
  explanation: string;
  hdurl?: string;
  title: string;
  url: string;
  media_type: 'image' | 'video';
}
