// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import apodReducer from '../presentation/apod/apodSlice';
import epicReducer from '../presentation/epic/epicSlice';   // ← aquí va

export const store = configureStore({
  reducer: {
    apod: apodReducer,
    epic: epicReducer,           // ← lo registras en el root reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
