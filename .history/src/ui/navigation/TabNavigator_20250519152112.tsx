import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Image as ImageIcon,
  Globe,
  Cloud,
  Asterisk,
  Search,
} from 'lucide-react-native';

import ApodScreen        from '../screens/ApodScreen';
import EpicScreen        from '../screens/EpicScreen';
import MarsWeatherScreen from '../screens/MarsWeatherScreen';
import NeoScreen         from '../screens/NeoScreen';
import AssetSearchScreen from '../screens/AssetSearchScreen';

import	DrawerToggle from './DrawerToggle';

export type RootTabParamList = {
  Apod: undefined;
  Epic: undefined;
  Mars: undefined;
  Neo:  undefined;
  Assets: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerLeft: () => <DrawerToggle />,
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Apod: ImageIcon,
            Epic: Globe,
            Mars: Cloud,
            Neo: Asterisk,
            Assets: Search,
          } as const;

          const IconComponent = icons[route.name as keyof typeof icons];
          return <IconComponent color={color} size={size} />;
        },
      })}
      initialRouteName="Apod"
    >
      <Tab.Screen name="Apod"   component={ApodScreen}        options={{ title: 'APOD' }} />
      <Tab.Screen name="Epic"   component={EpicScreen}        options={{ title: 'EPIC' }} />
      <Tab.Screen name="Mars"   component={MarsWeatherScreen} options={{ title: 'Clima Marte' }} />
      <Tab.Screen name="Neo"    component={NeoScreen}         options={{ title: 'NEO' }} />
      <Tab.Screen name="Assets" component={AssetSearchScreen} options={{ title: 'Biblioteca' }} />
    </Tab.Navigator>
  );
}
