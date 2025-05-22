import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function WelcomeScreen() {
  const { colors } = useTheme();
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
