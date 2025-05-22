import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apodReducer from '../presentation/viewmodels/apod/apodSlice';
import epicReducer from '../presentation/viewmodels/epic/epicSlice'; 
import marsWeatherReducer from '../presentation/viewmodels/InSight/marsWeatherSlice';
import neoReducer from '../presentation/viewmodels/neo/neoSlice';
import assetsReducer from '../presentation/viewmodels/assets/assetSlice';

// Combinación de todos los reducers en un solo rootReducer
const rootReducer = combineReducers({
  apod: apodReducer,
  epic: epicReducer,
  marsWeather: marsWeatherReducer,
  neo: neoReducer,
  assets: assetsReducer,
});
// Configuración para la persistencia del estado
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['apod'],
};

// Creación del store de Redux con persistencia
export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefault =>
    getDefault({
      serializableCheck: false, // Deshabilita la comprobación de serialización para la persistencia
    }),
});
// Tipos de TypeScript para el estado global y el dispatch
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>; // Tipo del estado completo
export type AppDispatch = typeof store.dispatch; // Tipo del dispatch del store
