import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNeos } from '../../presentation/neo/useNeos';
import { useTheme } from '@react-navigation/native';
import { addDays, formatISO } from 'date-fns';
import AsteroidLoader from '../components/AsteroidLoader';
import FadeInWrapper from '../components/FadeInWrapper';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default function NeoScreen() {
  const [currentDate, setCurrentDate] = useState(
    formatISO(new Date(), { representation: 'date' })
  );
  const { neos, status, error, refresh } = useNeos(currentDate);
  const { colors } = useTheme();

  // Animación fondo
  const bg = useSharedValue(colors.background);

  useEffect(() => {
    bg.value = withTiming(colors.background, { duration: 400 });
  }, [colors.background]);

  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: bg.value,
    flex: 1,
  }));

  useEffect(() => {
    refresh();
  }, [refresh]);

  const loadMore = () => {
    const prev = addDays(new Date(currentDate), -1);
    const iso = formatISO(prev, { representation: 'date' });
    setCurrentDate(iso);
  };

  if (status === 'loading' && neos.length === 0) return <AsteroidLoader />;

  if (status === 'failed' && neos.length === 0)
    return (
      <TouchableOpacity onPress={refresh} style={styles.center}>
        <Text style={{ color: colors.text }}>
          Error: {error} (toca para reintentar)
        </Text>
      </TouchableOpacity>
    );

  return (
    <FadeInWrapper>
      <Animated.View style={bgStyle}>
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
              <Text style={[styles.name, { color: colors.text }]}>
                ☄️ {item.name}
              </Text>
              <Text style={{ color: colors.text }}>
                Magnitud H: {item.magnitude.toFixed(1)}
              </Text>
              <Text style={{ color: colors.text }}>
                Cercano: {item.closeApproachDate} —{' '}
                {item.missDistanceKm.toLocaleString()} km
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
            status === 'loading' ? (
              <AsteroidLoader size={48} />
            ) : null
          }
        />
      </Animated.View>
    </FadeInWrapper>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
