import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useMarsWeather } from '../../presentation/viewmodels/InSight/useMarsWeather';
import { useTheme } from '@react-navigation/native';
import AsteroidLoader from '../components/AsteroidLoader';
import FadeInWrapper from '../components/FadeInWrapper';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default function MarsWeatherScreen() {
  const { sols, status, error, refresh } = useMarsWeather();
  const { colors } = useTheme();

  // Fondo animado con Reanimated
  const bg = useSharedValue(colors.background);

  useEffect(() => {
    bg.value = withTiming(colors.background, { duration: 400 });
  }, [colors.background]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: bg.value,
    flex: 1,
  }));

  if (status === 'loading') return <AsteroidLoader />;

  if (status === 'failed')
    return (
      <TouchableOpacity onPress={refresh} style={styles.center}>
        <Text style={{ color: colors.text }}>
          Error: {error} (toca para reintentar)
        </Text>
      </TouchableOpacity>
    );

  return (
    <FadeInWrapper>
      <Animated.View style={animatedStyle}>
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
      </Animated.View>
    </FadeInWrapper>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  sol: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
