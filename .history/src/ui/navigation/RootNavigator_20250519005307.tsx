import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Appearance } from 'react-native';
import { DarkTheme as NavDark, DefaultTheme as NavLight } from '@react-navigation/native';

import DrawerNavigator from './DrawerNavigator';

export default function RootNavigator() {
  const colorScheme = Appearance.getColorScheme();
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? NavDark : NavLight}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
