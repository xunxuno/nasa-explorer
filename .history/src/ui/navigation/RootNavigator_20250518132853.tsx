import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApodScreen from '../screens/ApodScreen';
import { DarkTheme as NavDark, DefaultTheme as NavLight } from '@react-navigation/native';
import { Appearance } from 'react-native';
import EpicScreen from '../screens/EpicScreen';

export type RootStackParamList = {
  Apod: undefined;
  Epic: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    const colorScheme = Appearance.getColorScheme();
    return (
    <NavigationContainer theme={colorScheme === 'dark' ? NavDark : NavLight}>
      <Stack.Navigator
        initialRouteName="Epic"
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Apod"
          component={ApodScreen}
          options={{ title: 'Astronomy Picture of the Day' }}
        />
        <Stack.Screen
          name="Epic"
          component={EpicScreen}
          options={{ title: 'EPIC Earth' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
