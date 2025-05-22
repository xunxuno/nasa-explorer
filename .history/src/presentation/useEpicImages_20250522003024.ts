import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchEpicImages } from './viewmodels/epic/epicSlice';

export const useEpicImages = (date: string) => {
  const dispatch = useAppDispatch();
  const { images, status, error } = useAppSelector(s => s.epic);

  useEffect(() => {
    dispatch(fetchEpicImages(date));
  }, [date, dispatch]);

  return { images, status, error, refresh: () => dispatch(fetchEpicImages(date)) };
};
