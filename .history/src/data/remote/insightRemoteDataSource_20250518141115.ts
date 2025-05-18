// src/data/remote/insightRemoteDataSource.ts
import axios from 'axios';
import { MarsSolWeather } from '../../domain/entities/MarsSolWeather';

const api = axios.create({
  baseURL: 'https://api.nasa.gov',
  params: {
    api_key: process.env.EXPO_PUBLIC_NASA_KEY,
    feedtype: 'json',
    ver: '1.0',
  },
});

export const fetchMarsWeatherRemote = async (): Promise<MarsSolWeather[]> => {
  const { data } = await api.get('/insight_weather/');
  const sols: MarsSolWeather[] = data.sol_keys.map((key: string) => ({
    sol: key,
    firstUTC: data[key].First_UTC,
    lastUTC: data[key].Last_UTC,
    season: data[key].Season,
    temp: data[key].AT,
    pressure: data[key].PRE,
    wind: data[key].HWS,
  }));
  return sols;
};
