import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function ApisInfoScreen() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>🚀 APIs utilizadas:</Text>
      <Text style={{ color: colors.text }}>Este explorador Usa 5 APIS publicas de la NASA, las cuales son:</Text>
      <Text style={{ color: colors.text, marginTop: 12 }}>• APOD</Text>
      <Text style={{ color: colors.text }}>• EPIC Earth</Text>
      <Text style={{ color: colors.text }}>• Mars Weather</Text>
      <Text style={{ color: colors.text }}>• NeoWs</Text>
      <Text style={{ color: colors.text }}>• Image & Video Library</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
});
