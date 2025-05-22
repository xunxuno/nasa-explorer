import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Platform,
} from 'react-native';
import { useApod } from '../../presentation/viewmodels/apod/useApod';
import { useTheme } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AsteroidLoader from '../components/AsteroidLoader';
import FadeInWrapper from '../components/FadeInWrapper';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default function ApodScreen() {
  const today = dayjs().format('YYYY-MM-DD');
  const [date, setDate] = useState<string | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);
  const { data, status, error, refresh } = useApod(date);
  const { colors } = useTheme();

  // Animación suave del fondo al cambiar tema
  const bgColor = useSharedValue(colors.background);

  useEffect(() => {
    bgColor.value = withTiming(colors.background, { duration: 400 });
  }, [colors.background]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: bgColor.value,
    flex: 1,
  }));

  const openPicker = () => setShowPicker(true);

  const onChange = (_: DateTimePickerEvent, selected?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selected) {
      setDate(dayjs(selected).format('YYYY-MM-DD'));
    }
  };

  const goPrev = () =>
    setDate(d =>
      dayjs(d ?? today).subtract(1, 'day').format('YYYY-MM-DD')
    );

  const goNext = () =>
    setDate(d => {
      if (!d) return undefined;
      const next = dayjs(d).add(1, 'day');
      return next.isAfter(dayjs(), 'day') ? undefined : next.format('YYYY-MM-DD');
    });

  if (status === 'loading') return <AsteroidLoader />;

  if (status === 'failed')
    return (
      <TouchableOpacity onPress={refresh} style={styles.center}>
        <Text style={{ color: colors.text }}>
          Error: {error} (toca para reintentar)
        </Text>
      </TouchableOpacity>
    );

  if (!data) return null;

  let imageUrl: string | undefined;
  switch (data.media_type) {
    case 'image':
      imageUrl = data.hdurl || data.url;
      break;
    case 'video':
      imageUrl = (data as any).thumbnail_url;
      break;
  }

  return (
    <FadeInWrapper>
      <Animated.View style={animatedStyle}>
        <ScrollView style={styles.container}>
          {/* Navegación de fechas */}
          <View style={styles.navRow}>
            <TouchableOpacity onPress={goPrev}>
              <Text style={[styles.navBtn, { color: colors.text }]}>← Anterior</Text>
            </TouchableOpacity>
            <Text style={{ color: colors.text }}>{data.date}</Text>
            <TouchableOpacity onPress={goNext}>
              <Text style={[styles.navBtn, { color: colors.text, opacity: date ? 1 : 0.3 }]}>
                Siguiente →
              </Text>
            </TouchableOpacity>
          </View>

          {/* Selector de fecha */}
          <View style={styles.pickerRow}>
            <TouchableOpacity onPress={openPicker} style={styles.pickerBtn}>
              <Text style={{ color: colors.text }}>📅 Elegir fecha</Text>
            </TouchableOpacity>
          </View>

          {showPicker && (
            <DateTimePicker
              value={date ? dayjs(date).toDate() : new Date()}
              mode="date"
              maximumDate={new Date()}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChange}
            />
          )}

          {/* Imagen o mensaje */}
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.textBlock}>
              <Text style={{ color: colors.text }}>
                Contenido de tipo “{data.media_type}” sin imagen disponible.
              </Text>
            </View>
          )}

          {/* Enlace al video si aplica */}
          {data.media_type === 'video' && (
            <TouchableOpacity onPress={() => Linking.openURL(data.url)} style={{ padding: 16 }}>
              <Text style={{ color: '#1e90ff' }}>🔗 Ver video en línea</Text>
            </TouchableOpacity>
          )}

          {/* Información */}
          <View style={styles.textBlock}>
            <Text style={[styles.title, { color: colors.text }]}>{data.title}</Text>
            <Text style={{ color: colors.text, marginTop: 8 }}>{data.explanation}</Text>
          </View>
        </ScrollView>
      </Animated.View>
    </FadeInWrapper>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1 },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  navBtn: { fontSize: 16 },
  image: { width: '100%', height: 300 },
  textBlock: { paddingHorizontal: 16, paddingVertical: 8 },
  title: { fontSize: 22, fontWeight: 'bold' },
  pickerRow: { alignItems: 'center', paddingBottom: 8 },
  pickerBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#888',
  },
});
