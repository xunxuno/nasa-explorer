import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import WelcomeScreen from '../screens/WelcomeScreen';
import ApisInfoScreen from '../screens/ApisInfoScreen';
import ContactScreen from '../screens/ContactScreen';
import	DrawerToggle from './DrawerToggle';

export type RootDrawerParamList = {
  Tabs: undefined;
  WelcomeScreen: undefined;
  ApisInfoScreen: undefined;
  ContactScreen: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function RootDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false , headerLeft: () => <DrawerToggle />,}}
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
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ drawerLabel: 'Bienvenida' }}
      />
      <Drawer.Screen
        name="ApisInfoScreen"
        component={ApisInfoScreen}
        options={{ drawerLabel: 'APIS' }}
      />
      <Drawer.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{ drawerLabel: 'Contacto' }}
      />
    </Drawer.Navigator>
  );
}
