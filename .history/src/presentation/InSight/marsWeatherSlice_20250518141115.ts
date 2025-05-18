import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MarsWeatherRepositoryImpl } from '../../data/MarsWeatherRepositoryImpl';
import { GetLatestMarsWeatherUseCase } from '../../domain/usecases/GetLatestMarsWeatherUseCase';
import { MarsSolWeather } from '../../domain/entities/MarsSolWeather';

const repo = new MarsWeatherRepositoryImpl();
const getLatest = new GetLatestMarsWeatherUseCase(repo);

export const fetchMarsWeather = createAsyncThunk(
  'marsWeather/fetch',
  () => getLatest.execute()
);

interface MarsWeatherState {
  sols: MarsSolWeather[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: MarsWeatherState = {
  sols: [],
  status: 'idle',
};

const marsWeatherSlice = createSlice({
  name: 'marsWeather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMarsWeather.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchMarsWeather.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.sols = payload;
      })
      .addCase(fetchMarsWeather.rejected, (state, { error }) => {
        state.status = 'failed';
        state.error = error.message;
      });
  },
});

export default marsWeatherSlice.reducer;
