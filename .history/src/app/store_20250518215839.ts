import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apodReducer from '../presentation/apod/apodSlice';
import epicReducer from '../presentation/epic/epicSlice'; 
import marsWeatherReducer from '../presentation/InSight/marsWeatherSlice';
import neoReducer from '../presentation/neo/neoSlice';

const rootReducer = combineReducers({
  apod: apodReducer,
  epic: epicReducer,
  marsWeather: marsWeatherReducer,
  neo: neoReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['apod'],
};


export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefault =>
    getDefault({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
