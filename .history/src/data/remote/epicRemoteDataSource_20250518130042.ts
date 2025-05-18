import axios from 'axios';
import { EpicImage } from '../../domain/entities/EpicImage';

const api = axios.create({
  baseURL: 'https://api.nasa.gov',
  params: { api_key: process.env.EXPO_PUBLIC_NASA_KEY },
});

// Devuelve imágenes y resuelve URL JPG final
export const fetchEpicImagesRemote = async (date: string): Promise<string[]> => {
  const pathDate = date; // YYYY-MM-DD
  const { data } = await api.get<EpicImage[]>(`/EPIC/api/natural/date/${pathDate}`);
  return data.map(img => {
    const [y, m, d] = pathDate.split('-');
    return `https://epic.gsfc.nasa.gov/archive/natural/${y}/${m}/${d}/jpg/${img.image}.jpg`;
  });
};
