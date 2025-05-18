import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Apod } from '../../domain/entities/Apod';
import { ApodRepositoryImpl } from '../../data/ApodRepositoryImpl';
import { GetApodUseCase } from '../../domain/usecases/GetApodUseCase';

const repo = new ApodRepositoryImpl();
const getApod = new GetApodUseCase(repo);

export const fetchApod = createAsyncThunk('apod/fetch', () => getApod.execute());

interface ApodState {
  data: Apod | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: ApodState = { data: null, status: 'idle' };

const apodSlice = createSlice({
  name: 'apod',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchApod.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchApod.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.data = payload;
      })
      .addCase(fetchApod.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      });
  },
});

export default apodSlice.reducer;
