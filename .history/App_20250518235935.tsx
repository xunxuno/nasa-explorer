import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/app/store';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from './src/ui/navigation/RootNavigator';
import DrawerNavigator from './src/ui/navigation/DrawerNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DrawerNavigator />
      </PersistGate>
    </Provider>
  );
}