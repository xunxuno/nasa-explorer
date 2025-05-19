export interface NearEarthObject {
  id: string;
  name: string;
  magnitude: number;    
  isHazardous: boolean; 
  closeApproachDate: string; 
  missDistanceKm: number;
  velocityKms: number;
}
