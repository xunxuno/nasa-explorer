import axios from 'axios';
import { EpicImage } from '../../domain/entities/EpicImage';

const api = axios.create({
  baseURL: 'https://api.nasa.gov',
  params: { api_key: process.env.EXPO_PUBLIC_NASA_KEY },
});

/**
 * Obtiene las imágenes EPIC (Earth Polychromatic Imaging Camera) desde el API remoto de NASA
 * param date - Fecha en formato YYYY-MM-DD para obtener las imágenes de ese día
 * returns Promise<string[]> - Array de URLs de las imágenes EPIC
 */

export const fetchEpicImagesRemote = async (date: string): Promise<string[]> => {
  const pathDate = date; // Almacena la fecha recibida para usarla en el path y en la URL de imagen
  const { data } = await api.get<EpicImage[]>(`/EPIC/api/natural/date/${pathDate}`); // Realiza la petición GET al endpoint EPIC con la fecha proporcionada
  return data.map(img => { // Mapea los datos de respuesta para generar las URLs completas de las imágenes
    const [y, m, d] = pathDate.split('-'); // Desestructura la fecha en año, mes y día para construir la URL
    return `https://epic.gsfc.nasa.gov/archive/natural/${y}/${m}/${d}/jpg/${img.image}.jpg`; // Construye y retorna la URL completa de la imagen en formato JPEG
  });
};
