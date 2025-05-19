import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '@react-navigation/native';

import ApodScreen       from '../screens/ApodScreen';
import EpicScreen       from '../screens/EpicScreen';
import MarsWeatherScreen from '../screens/MarsWeatherScreen';
import NeoScreen        from '../screens/NeoScreen';
import AssetSearchScreen from '../screens/AssetSearchScreen';

export type DrawerParamList = {
  Apod: undefined;
  Epic: undefined;
  MarsWeather: undefined;
  Neo: undefined;
  Assets: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="Apod"
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
      }}
    >
      <Drawer.Screen
        name="Apod"
        component={ApodScreen}
        options={{ drawerLabel: 'APOD' }}
      />
      <Drawer.Screen
        name="Epic"
        component={EpicScreen}
        options={{ drawerLabel: 'EPIC Earth' }}
      />
      <Drawer.Screen
        name="MarsWeather"
        component={MarsWeatherScreen}
        options={{ drawerLabel: 'Clima en Marte' }}
      />
      <Drawer.Screen
        name="Neo"
        component={NeoScreen}
        options={{ drawerLabel: 'Asteroides NEO' }}
      />
      <Drawer.Screen
        name="Assets"
        component={AssetSearchScreen}
        options={{ drawerLabel: 'Biblioteca NASA' }}
      />
    </Drawer.Navigator>
  );
}
