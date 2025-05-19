export interface NasaAsset {
  nasaId: string;
  title: string;
  description: string;
  mediaType: 'image' | 'video' | 'audio';
  thumbUrl: string;        
  previewUrl: string;      
  dateCreated: string;     
}
