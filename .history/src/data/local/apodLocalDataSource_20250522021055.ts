import AsyncStorage from '@react-native-async-storage/async-storage';
import { Apod } from '../../domain/entities/Apod';

// Clave única para identificar los datos almacenados en AsyncStorage
const STORAGE_KEY = '@apod_cache';

/**
 * Guarda un objeto Apod en el almacenamiento local del dispositivo
 * param apod - Objeto de tipo Apod que contiene la información a almacenar
 * returns Promise<void> que se resuelve cuando la operación de guardado es completada
 */

export const saveApodLocal = async (apod: Apod) =>
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(apod));

/**
 * Obtiene el objeto Apod previamente guardado en el almacenamiento local
 * returns Promise<Apod | null> - Devuelve el objeto Apod si existe, o null si no hay datos guardados
 */
export const getApodLocal = async (): Promise<Apod | null> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY); // Obtiene los datos en formato string
  return raw ? (JSON.parse(raw) as Apod) : null; // Parsea los datos a tipo Apod si existen
};
