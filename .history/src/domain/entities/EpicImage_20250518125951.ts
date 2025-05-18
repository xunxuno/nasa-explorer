// src/domain/entities/EpicImage.ts
export interface EpicImage {
  identifier: string;          // "20250518003135"
  date: string;                // "2025-05-18 00:31:35"
  caption: string;
  image: string;               // "epic_1b_20250518003135"
  centroid_coordinates: { lat: number; lon: number };
  sun_j2000_position: { x: number; y: number; z: number };
  lunar_j2000_position: { x: number; y: number; z: number };
  dscovr_j2000_position: { x: number; y: number; z: number };
}
