import React from 'react';
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
  const { data, status, error, refresh } = useApod();
  const { colors } = useTheme();

  /* -------------------- ESTADOS DE CARGA -------------------- */
  if (status === 'loading')
    return (
      <ActivityIndicator
        size="large"
        style={styles.center}
        color={colors.text}
      />
    );

  if (status === 'failed')
    return (
      <TouchableOpacity onPress={refresh} style={styles.center}>
        <Text style={{ color: colors.text }}>
          Error: {error} (toca para reintentar)
        </Text>
      </TouchableOpacity>
    );

  if (!data) return null;

  /* -------------------- RESOLVER URL VISUAL -------------------- */
  let imageUrl: string | undefined;
  switch (data.media_type) {
    case 'image':
      imageUrl = data.hdurl || data.url;
      break;
    case 'video':
      // La API a veces incluye thumbnail_url para YouTube/Vimeo
      imageUrl = (data as any).thumbnail_url;
      break;
    default:
      imageUrl = undefined; // 'other' u otros tipos
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.textBlock}>
          <Text style={{ color: colors.text }}>
            Hoy la NASA publicó contenido de tipo “{data.media_type}”, sin
            imagen disponible.
          </Text>
        </View>
      )}

      {/* Para videos, ofrece abrir el enlace */}
      {data.media_type === 'video' && (
        <TouchableOpacity
          onPress={() => Linking.openURL(data.url)}
          style={{ padding: 16 }}
        >
          <Text style={{ color: '#1e90ff' }}>🔗 Ver video en línea</Text>
        </TouchableOpacity>
      )}

      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: colors.text }]}>{data.title}</Text>
        <Text style={{ color: colors.text, marginTop: 8 }}>
          {data.explanation}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1 },
  image: { width: '100%', height: 300 },
  textBlock: { paddingHorizontal: 16, paddingVertical: 8 },
  title: { fontSize: 22, fontWeight: 'bold' },
});
