import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNeos } from '../../presentation/neo/useNeos';
import { useTheme } from '@react-navigation/native';
import { addDays, formatISO } from 'date-fns';

export default function NeoScreen() {
  const [currentDate, setCurrentDate] = useState(formatISO(new Date(), { representation: 'date' }));
  const { neos, status, error, refresh } = useNeos(currentDate);
  const { colors } = useTheme();

  /* carga inicial */
  useEffect(() => refresh(), [refresh]);

  /* scroll infinito: carga día anterior */
  const loadMore = () => {
    const prev = addDays(new Date(currentDate), -1);
    const iso  = formatISO(prev, { representation: 'date' });
    setCurrentDate(iso);
  };

  if (status === 'loading' && neos.length === 0)
    return <ActivityIndicator style={styles.center} size="large" color={colors.text} />;

  if (status === 'failed' && neos.length === 0)
    return (
      <TouchableOpacity onPress={refresh} style={styles.center}>
        <Text style={{ color: colors.text }}>Error: {error} (toca para reintentar)</Text>
      </TouchableOpacity>
    );

  return (
    <FlatList
      data={neos}
      keyExtractor={n => n.id}
      contentContainerStyle={{ padding: 16 }}
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      onRefresh={refresh}
      refreshing={status === 'loading'}
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
          <Text style={{ color: colors.text }}>
            Magnitud H: {item.magnitude.toFixed(1)}
          </Text>
          <Text style={{ color: colors.text }}>
            Cercano: {item.closeApproachDate} — {item.missDistanceKm.toFixed(0)} km
          </Text>
          <Text style={{ color: colors.text }}>
            Velocidad: {item.velocityKms.toFixed(1)} km/s
          </Text>
          {item.isHazardous && (
            <Text style={{ color: 'tomato', fontWeight: 'bold' }}>
              ⚠️ Potencialmente peligroso
            </Text>
          )}
        </View>
      )}
      ListFooterComponent={
        status === 'loading' ? <ActivityIndicator style={{ marginVertical: 12 }} /> : null
      }
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
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
});
