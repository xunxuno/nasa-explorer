import AsyncStorage from '@react-native-async-storage/async-storage';
import { Apod } from '../../domain/entities/Apod';

const STORAGE_KEY = '@apod_cache';

export const saveApodLocal = async (apod: Apod) =>
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(apod));

export const getApodLocal = async (): Promise<Apod | null> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Apod) : null;
};
