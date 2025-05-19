import React from 'react';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { RootDrawerParamList } from './DrawerNavigator';

export default function DrawerToggle() {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  return (
    <IconButton
      icon="menu"
      size={24}
      onPress={() => navigation.openDrawer()}
    />
  );
}
