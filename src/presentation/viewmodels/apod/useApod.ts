import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchApod } from './apodSlice';

export const useApod = (date?: string) => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector(s => s.apod);

  useEffect(() => {
    dispatch(fetchApod(date));
  }, [date, dispatch]);

  return { data, status, error, refresh: () => dispatch(fetchApod(date)) };
};
