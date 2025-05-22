import React from 'react';
import { Provider } from 'react-redux'; // Importación de Provider y store de Redux para manejo del estado global.
import { store, persistor } from './src/app/store';
import { PersistGate } from 'redux-persist/integration/react'; // Importación de PersistGate para persistencia del estado de Redux.
import RootNavigator from './src/ui/navigation/RootNavigator'; // Importación del componente RootNavigator que maneja la navegación principal.
import 'react-native-gesture-handler'; // Importación de bibliotecas necesarias para gestos y animaciones en React Native.
import 'react-native-reanimated';

export default function App() {
  return (
    <Provider store={store}> 
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}