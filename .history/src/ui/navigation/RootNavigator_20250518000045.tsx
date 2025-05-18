import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApodScreen from '../screens/ApodScreen';

export type RootStackParamList = {
  Apod: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Apod"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
