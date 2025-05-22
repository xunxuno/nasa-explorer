import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EpicRepositoryImpl } from '../../../data/EpicRepositoryImpl';
import { GetEpicImagesUseCase } from '../../../domain/usecases/GetEpicImagesUseCase';

const repo = new EpicRepositoryImpl();
const getImages = new GetEpicImagesUseCase(repo);


export const fetchEpicImages = createAsyncThunk(
  'epic/fetch',
  (date: string) => getImages.execute(date)
);

interface EpicState {
  images: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
  date: string; 
}

const initialState: EpicState = {
  images: [],
  status: 'idle',
  date: '',
};

const epicSlice = createSlice({
  name: 'epic',
  initialState,
  reducers: {
    clear(state) {
      state.images = [];
      state.status = 'idle';
      state.error = undefined;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEpicImages.pending, (state, action) => {
        state.status = 'loading';
        state.date = action.meta.arg;
      })
      .addCase(fetchEpicImages.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.images = payload;
      })
      .addCase(fetchEpicImages.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      });
  },
});

export const { clear } = epicSlice.actions;
export default epicSlice.reducer;
