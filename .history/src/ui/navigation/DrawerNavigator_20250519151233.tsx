import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import ApodScreen       from '../screens/ApodScreen';
import EpicScreen       from '../screens/EpicScreen';
export type RootDrawerParamList = {
  Tabs: undefined;
  ApodScreen: undefined;
  EpicScreen: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function RootDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Tabs"
    >
      {/* pestañas como ruta principal */}
      <Drawer.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ drawerLabel: 'Explorador' }}
      />
      {/* secciones extra */}
      <Drawer.Screen
        name="ApodScreen"
        component={ApodScreen}
        options={{ drawerLabel: 'ApodScreen' }}
      />
      <Drawer.Screen
        name="EpicScreen"
        component={EpicScreen}
        options={{ drawerLabel: 'EpicScreen' }}
      />
    </Drawer.Navigator>
  );
}
