import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apodReducer from '../presentation/viewmodels/apod/apodSlice';
import epicReducer from '../presentation/viewmodels/epic/epicSlice'; 
import marsWeatherReducer from '../presentation/viewmodels/InSight/marsWeatherSlice';
import neoReducer from '../presentation/viewmodels/neo/neoSlice';
import assetsReducer from '../presentation/viewmodels/assets/assetSlice';


const rootReducer = combineReducers({
  apod: apodReducer,
  epic: epicReducer,
  marsWeather: marsWeatherReducer,
  neo: neoReducer,
  assets: assetsReducer,
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
