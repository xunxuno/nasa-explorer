import React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { useApod } from '../../presentation/apod/useApod';

export default function ApodScreen() {
  const { data, status, error, refresh } = useApod();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  if (status === 'loading') return <ActivityIndicator size="large" style={styles.center} />;
  if (status === 'failed') return <Text onPress={refresh}>Error: {error} (toca para reintentar)</Text>;
  if (!data) return null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      {data.media_type === 'image' && (
        <Image source={{ uri: data.url }} style={styles.image} resizeMode="cover" />
      )}
      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{data.title}</Text>
        <Text style={{ color: isDark ? '#ddd' : '#333', marginTop: 8 }}>{data.explanation}</Text>
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
