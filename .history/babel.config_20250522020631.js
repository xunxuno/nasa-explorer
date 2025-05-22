module.exports = function (api) { //Cachea la configuración basada en el entorno.
  api.cache(true);
  return {// Configuración de presets y plugins:
    presets: ['babel-preset-expo'], // Preset oficial de Expo para React Native.
    plugins: ['react-native-reanimated/plugin'],// Plugin para la librería Reanimated
  };
};
