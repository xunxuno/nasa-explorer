import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useApod } from '../../presentation/apod/useApod';
import { useTheme } from '@react-navigation/native';

export default function ApodScreen() {
  const today = dayjs().format('YYYY-MM-DD');
  const [date, setDate] = useState<string | undefined>(undefined); // undef = hoy
  const { data, status, error, refresh } = useApod(date);
  const { colors } = useTheme();

  /* --- helpers para cambiar fecha --- */
  const goPrev = () =>
    setDate(d =>
      dayjs(d ?? today).subtract(1, 'day').format('YYYY-MM-DD')
    );

  const goNext = () =>
    setDate(d => {
      if (!d) return undefined; // ya estamos en hoy
      const next = dayjs(d).add(1, 'day');
      return next.isAfter(dayjs(), 'day') ? undefined : next.format('YYYY-MM-DD');
    });

  /* --- estados de carga y error --- */
  if (status === 'loading')
    return <ActivityIndicator size="large" style={styles.center} color={colors.text} />;

  if (status === 'failed')
    return (
      <TouchableOpacity onPress={refresh} style={styles.center}>
        <Text style={{ color: colors.text }}>
          Error: {error} (toca para reintentar)
        </Text>
      </TouchableOpacity>
    );

  if (!data) return null;

  /* --- resolver imagen / video / other --- */
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
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Nav row */}
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

      {/* Link a video si aplica */}
      {data.media_type === 'video' && (
        <TouchableOpacity onPress={() => Linking.openURL(data.url)} style={{ padding: 16 }}>
          <Text style={{ color: '#1e90ff' }}>🔗 Ver video en línea</Text>
        </TouchableOpacity>
      )}

      {/* Texto explicativo */}
      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: colors.text }]}>{data.title}</Text>
        <Text style={{ color: colors.text, marginTop: 8 }}>{data.explanation}</Text>
      </View>
    </ScrollView>
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
});
