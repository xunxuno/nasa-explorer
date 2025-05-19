export interface MarsSolWeather {
  sol: string;                 // "1260"
  firstUTC: string;
  lastUTC: string;
  season: string;              // "summer"
  temp: { mn: number; mx: number; av: number };
  pressure: { mn: number; mx: number; av: number };
  wind: { mn: number; mx: number; av: number };
}