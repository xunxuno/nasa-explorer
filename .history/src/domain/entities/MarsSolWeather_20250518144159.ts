export interface MarsSolWeather {
  sol: string;                 // "1260"
  firstUTC: string;
  lastUTC: string;
  season: Season;                        // "summer"
  temp: { mn: number; mx: number; av: number };
  pressure: { mn: number; mx: number; av: number };
  wind: { mn: number; mx: number; av: number };
}
export interface SeasonObj {
  northern: string;
  southern: string;
}

export type Season = string | SeasonObj;