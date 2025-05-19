import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchAssets, nextPage, setQuery, setMedia, clear } from './assetSlice';
import { useCallback } from 'react';

export function useAssets() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s.assets);

  return {
    ...state,
    search: (q: string, media: string | undefined) => {
      dispatch(setQuery(q));
      dispatch(setMedia(media));
      dispatch(fetchAssets());
    },
    loadMore: () => {
      dispatch(nextPage());
      dispatch(fetchAssets());
    },
    reset: () => dispatch(clear()),
  };
}
