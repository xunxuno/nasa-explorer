import axios from 'axios'; // Importación de axios para realizar peticiones HTTP
import { Apod } from '../../domain/entities/Apod';

const api = axios.create({ // Creación de una instancia configurada de axios con la URL base de la API de NASA y parámetros por defecto que incluyen la API key
  baseURL: 'https://api.nasa.gov', // URL base del API de NASA
  params: { api_key: process.env.EXPO_PUBLIC_NASA_KEY }, // API key almacenada en variables de entorno
});

/**
 * Obtiene la Astronomy Picture of the Day (APOD) desde el API remoto de NASA
 * param date - Fecha opcional en formato YYYY-MM-DD para obtener la APOD de un día específico
 * returns Promise<Apod> - Objeto con los datos de la imagen astronómica del día
 */
export const fetchApodRemote = async (date?: string): Promise<Apod> => {
  const { data } = await api.get<Apod>('/planetary/apod', { // Realiza la petición GET al endpoint '/planetary/apod' con el parámetro de fecha si existe
    params: { date }, // Agrega el parámetro date a la petición si fue proporcionado
  });
  return data; // Devuelve los datos de la respuesta tipados como Apod

};
