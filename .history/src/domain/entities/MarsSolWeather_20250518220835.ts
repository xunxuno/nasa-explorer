export interface MarsSolWeather {
  sol: string;                
  firstUTC: string;
  lastUTC: string;
  season: string;              
  temp: { mn: number; mx: number; av: number };
  pressure: { mn: number; mx: number; av: number };
  wind: { mn: number; mx: number; av: number };
}