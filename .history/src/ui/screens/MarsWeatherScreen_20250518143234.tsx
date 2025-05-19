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
import WindRose from '../../presentation/InSight/WindRose';

export default function MarsWeatherScreen() {
  const { sols, status, error, refresh } = useMarsWeather();
  const { colors } = useTheme();

  // -------- estados de carga / error ----------
  if (status === 'loading')
    return <ActivityIndicator style={styles.center} size="large" color={colors.text} />;

  if (status === 'failed')
    return (
      <TouchableOpacity onPress={refresh} style={styles.center}>
        <Text style={{ color: colors.text }}>Error: {error} (toca para reintentar)</Text>
      </TouchableOpacity>
    );

  // -------- lista de sols válidos --------------
  const validSols = sols.filter(
    s => s.temp?.mn != null && s.temp?.mx != null && s.wind?.av != null
  );

  return (
    <FlatList
      data={validSols}
      keyExtractor={item => item.sol}
      contentContainerStyle={{ padding: 16 }}
      onRefresh={refresh}
      refreshing={false}
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sol, { color: colors.text }]}>Sol {item.sol}</Text>

          {/* Rosa de vientos */}
          <WindRose speed={item.wind?.av ?? 0} />

          {/* Datos meteorológicos */}
          <Text style={{ color: colors.text, marginTop: 4 }}>
            Temp ⬇ {item.temp?.mn?.toFixed?.(0) ?? '—'}°C | ⬆{' '}
            {item.temp?.mx?.toFixed?.(0) ?? '—'}°C
          </Text>
          <Text style={{ color: colors.text }}>
            Presión: {item.pressure?.av?.toFixed?.(0) ?? '—'} Pa
          </Text>
          <Text style={{ color: colors.text }}>
            Viento: {item.wind?.av?.toFixed?.(0) ?? '—'} m/s
          </Text>
          <Text style={{ color: colors.text, fontStyle: 'italic' }}>
            Estación: {item.season ?? '—'}
          </Text>
        </View>
      )}
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
