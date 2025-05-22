import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { NasaAsset } from '../../domain/entities/NasaAsset';
import { AssetRepositoryImpl } from '../../data/remote/AssetRepositoryImpl';
import { SearchAssetsUseCase } from '../../domain/usecases/SearchAssetsUseCase';

interface AssetState {
  q: string;
  media: string | undefined;
  page: number;
  total: number;
  items: NasaAsset[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: AssetState = {
  q: '',
  media: undefined,
  page: 1,
  total: 0,
  items: [],
  status: 'idle',
};

export const fetchAssets = createAsyncThunk<
  { items: NasaAsset[]; total: number },
  void,
  { state: RootState }
>('assets/fetch', async (_, { getState }) => {
  const { q, media, page } = (getState() as RootState).assets;
  const uc = new SearchAssetsUseCase(new AssetRepositoryImpl());
  return await uc.execute(q, media, page);
});

const slice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.q = action.payload;
      state.page = 1;
      state.items = [];
    },
    setMedia(state, action) {
      state.media = action.payload;
      state.page = 1;
      state.items = [];
    },
    nextPage(state) {
      state.page += 1;
    },
    clear(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder
  .addCase(fetchAssets.pending, state => {
    state.status = 'loading';
  })
  .addCase(fetchAssets.fulfilled, (state, action) => {
    state.status = 'succeeded';
    state.total = action.payload.total;
    state.items = [...state.items, ...action.payload.items];
  })
  .addCase(fetchAssets.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.error.message;
  });

  },
});

export const { setQuery, setMedia, nextPage, clear } = slice.actions;
export default slice.reducer;
