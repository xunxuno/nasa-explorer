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

  /* 1. Loading / error states */
  if (status === 'loading')
    return <ActivityIndicator style={styles.center} size="large" color={colors.text} />;

  if (status === 'failed')
    return (
      <TouchableOpacity onPress={refresh} style={styles.center}>
        <Text style={{ color: colors.text }}>Error: {error} (toca para reintentar)</Text>
      </TouchableOpacity>
    );

  /* 2. Filtra sols sin datos numéricos */
  const validSols = sols.filter(
    s => typeof s.temp?.mn === 'number' && typeof s.temp?.mx === 'number'
  );

  /* 3. Render */
  return (
    <FlatList
      data={validSols}
      keyExtractor={item => item.sol}
      contentContainerStyle={{ padding: 16 }}
      onRefresh={refresh}
      refreshing={false}
      renderItem={({ item }) => {
        const tempMin = item.temp?.mn?.toFixed?.(0) ?? '—';
        const tempMax = item.temp?.mx?.toFixed?.(0) ?? '—';
        const pres    = item.pressure?.av?.toFixed?.(0) ?? '—';
        const windAv  = item.wind?.av ?? 0;
        // Season puede llegar como string o como objeto { northern: 'summer', ... }
        const season =
          typeof item.season === 'string'
            ? item.season
            : item.season?.northern ?? '—';

        return (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.sol, { color: colors.text }]}>Sol {item.sol}</Text>

            {/* Rosa de vientos */}
            <WindRose speed={windAv} />

            {/* Datos meteorológicos */}
            <Text style={{ color: colors.text, marginTop: 4 }}>
              Temp ⬇ {tempMin}°C | ⬆ {tempMax}°C
            </Text>
            <Text style={{ color: colors.text }}>Presión: {pres} Pa</Text>
            <Text style={{ color: colors.text }}>Viento: {windAv.toFixed?.(1) ?? '—'} m/s</Text>
            <Text style={{ color: colors.text, fontStyle: 'italic' }}>
              Estación: {season}
            </Text>
          </View>
        );
      }}
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
