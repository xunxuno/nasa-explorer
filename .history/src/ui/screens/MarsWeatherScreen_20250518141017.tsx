import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useMarsWeather } from '../../presentation/useMarsWeather';
import { useTheme } from '@react-navigation/native';

export default function MarsWeatherScreen() {
  const { sols, status, error, refresh } = useMarsWeather();
  const { colors } = useTheme();

  if (status === 'loading')
    return <ActivityIndicator style={styles.center} size="large" color={colors.text} />;

  if (status === 'failed')
    return (
      <TouchableOpacity onPress={refresh} style={styles.center}>
        <Text style={{ color: colors.text }}>Error: {error} (toca para reintentar)</Text>
      </TouchableOpacity>
    );

  return (
    <FlatList
      data={sols}
      keyExtractor={item => item.sol}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sol, { color: colors.text }]}>Sol {item.sol}</Text>
          <Text style={{ color: colors.text }}>
            Temp ⬇ {item.temp.mn.toFixed(0)}°C | ⬆ {item.temp.mx.toFixed(0)}°C
          </Text>
          <Text style={{ color: colors.text }}>
            Presión: {item.pressure.av.toFixed(0)} Pa
          </Text>
          <Text style={{ color: colors.text }}>
            Viento: {item.wind.av.toFixed(0)} m/s
          </Text>
          <Text style={{ color: colors.text, fontStyle: 'italic' }}>
            Estación marciana: {item.season}
          </Text>
        </View>
      )}
      refreshing={false}
      onRefresh={refresh}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  sol: { fontSize: 18, fontWeight: 'bold' },
});
