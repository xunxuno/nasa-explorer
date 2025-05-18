import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchApod } from './apodSlice';

export const useApod = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector(s => s.apod);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchApod());
  }, [status, dispatch]);

  return { data, status, error, refresh: () => dispatch(fetchApod()) };
};
