import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NearEarthObject } from '../../domain/entities/NearEarthObject';
import { GetNeosByDateUseCase } from '../../domain/usecases/GetNeosByDateUseCase';
import { RootState, ThunkExtra } from '../../app/store';

interface NeoState {
  dateISO: string;                 // día consultado
  neos: NearEarthObject[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: NeoState = {
  dateISO: '',
  neos: [],
  status: 'idle',
};

export const fetchNeosByDate = createAsyncThunk<
  NearEarthObject[],
  string,
  { state: RootState; extra: ThunkExtra }
>('neo/fetchByDate', async (dateISO, { extra }) => {
  const uc = extra.getNeosByDateUseCase() as GetNeosByDateUseCase;
  return await uc.execute(dateISO);
});

const neoSlice = createSlice({
  name: 'neo',
  initialState,
  reducers: {
    clear(state) {
      state.neos = [];
      state.dateISO = '';
      state.status = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNeosByDate.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchNeosByDate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.neos = action.payload;
        state.dateISO = action.meta.arg;
      })
      .addCase(fetchNeosByDate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clear } = neoSlice.actions;
export default neoSlice.reducer;
