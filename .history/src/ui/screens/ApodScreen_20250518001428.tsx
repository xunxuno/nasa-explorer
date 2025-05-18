import React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useApod } from '../../presentation/apod/useApod';
import { useTheme } from '@react-navigation/native';

export default function ApodScreen() {
  const { data, status, error, refresh } = useApod();
  const { colors } = useTheme();

  if (status === 'loading') return <ActivityIndicator size="large" style={styles.center} color={colors.text} />;
  if (status === 'failed') return <Text onPress={refresh}>Error: {error} (toca para reintentar)</Text>;
  if (!data) return null;

  const imageUrl = data.media_type === 'image' ? data.hdurl || data.url : undefined;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      )}

      {data.media_type === 'video' && (
        <Text style={{ color: colors.text, padding: 16 }}>
          La foto de hoy es un video. Ábrelo aquí: {data.url}
        </Text>
      )}

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
  image: { width: '100%', height: 300 },
  textBlock: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold' },
});
