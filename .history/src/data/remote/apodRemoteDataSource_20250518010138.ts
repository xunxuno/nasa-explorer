import axios from 'axios';
import { Apod } from '../../domain/entities/Apod';

const api = axios.create({
  baseURL: 'https://api.nasa.gov',
  params: { api_key: process.env.EXPO_PUBLIC_NASA_KEY },
});

export const fetchApodRemote = async (date?: string): Promise<Apod> => {
  const { data } = await api.get<Apod>('/planetary/apod', {
    params: { date },
  });
  return data;
};
