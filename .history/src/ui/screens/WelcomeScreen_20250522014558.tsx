import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { useTheme, DrawerActions, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {

  const { colors } = useTheme();
  const navigation = useNavigation();
  
    useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ paddingHorizontal: 12 }}>
          <Ionicons name="menu" size={24} color={colors.text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>🌌 Bienvenido a NASA Explorer</Text>
      <Text style={{ color: colors.text, marginTop: 12 }}>
        Esta app explora varias APIs públicas de la NASA con animaciones y temas dinámicos.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
});
