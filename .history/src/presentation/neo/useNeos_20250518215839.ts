import { useAppDispatch, useAppSelector } from '../hooks'; // tus hooks typed
import { fetchNeosByDate } from './neoSlice';
import { useCallback } from 'react';

export function useNeos(dateISO: string) {
  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s.neo);

  const refresh = useCallback(() => {
    dispatch(fetchNeosByDate(dateISO));
  }, [dispatch, dateISO]);

  return { ...state, refresh };
}
