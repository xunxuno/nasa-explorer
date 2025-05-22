import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Importación de funciones de Redux Toolkit para crear slices y manejar acciones asíncronas
import { Apod } from '../../../domain/entities/Apod';
import { ApodRepositoryImpl } from '../../../data/ApodRepositoryImpl';
import { GetApodUseCase } from '../../../domain/usecases/GetApodUseCase';

const repo = new ApodRepositoryImpl();
const getApod = new GetApodUseCase(repo);

/**
 * Acción asíncrona para obtener la Astronomy Picture of the Day (APOD)
 * param date Fecha opcional en formato string (YYYY-MM-DD)
 * returns Promise<Apod> con los datos de la imagen astronómica
 */

export const fetchApod = createAsyncThunk('apod/fetch', (date?: string) => getApod.execute(date));
// Definición del tipo para el estado de APOD en Redux
interface ApodState {
  data: Apod | null;// Datos de la imagen astronómica
  status: 'idle' | 'loading' | 'succeeded' | 'failed';// Estado de la petición
  error?: string; // Mensaje de error en caso de fallo
}
// Estado inicial del slice
const initialState: ApodState = { data: null, status: 'idle' };
// Creación del slice de Redux para manejar el estado de APOD
const apodSlice = createSlice({
  name: 'apod',
  initialState,
  reducers: {},
  extraReducers: builder => {// Manejo de acciones asíncronas
    builder
      .addCase(fetchApod.pending, state => {// Caso cuando la petición está en progreso
        state.status = 'loading';
      })
      .addCase(fetchApod.fulfilled, (state, { payload }) => {// Caso cuando la petición se completa exitosamente
        state.status = 'succeeded';
        state.data = payload;
      })
      .addCase(fetchApod.rejected, (state, { error }) => {// Caso cuando la petición falla
        state.status = 'failed';
        state.error = error.message;
      });
  },
});

export default apodSlice.reducer;
