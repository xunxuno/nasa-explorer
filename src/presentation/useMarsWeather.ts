import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchMarsWeather } from './InSight/marsWeatherSlice';

export const useMarsWeather = () => {
  const dispatch = useAppDispatch();
  const { sols, status, error } = useAppSelector(s => s.marsWeather);

  useEffect(() => {
    dispatch(fetchMarsWeather());
  }, [dispatch]);

  return { sols, status, error, refresh: () => dispatch(fetchMarsWeather()) };
};
