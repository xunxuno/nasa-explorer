// src/domain/entities/EpicImage.ts
export interface EpicImage {
  identifier: string;          
  date: string;                
  caption: string;
  image: string;               
  centroid_coordinates: { lat: number; lon: number };
  sun_j2000_position: { x: number; y: number; z: number };
  lunar_j2000_position: { x: number; y: number; z: number };
  dscovr_j2000_position: { x: number; y: number; z: number };
}
