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
  const [loaded, setLoaded] = useState(false);


  const fade = useSharedValue(0);


  useEffect(() => {
  setLoaded(false); // reiniciar carga
  fade.value = 0;
}, [data?.url]);

const fadeStyle = useAnimatedStyle(() => ({
  opacity: fade.value,
}));

  const openPicker = () => setShowPicker(true);

  const onChange = (_: DateTimePickerEvent, selected?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selected) {
      setDate(dayjs(selected).format('YYYY-MM-DD'));
    }
  };

  const goPrev = () =>
    setDate(d => dayjs(d ?? today).subtract(1, 'day').format('YYYY-MM-DD'));

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
        <Text style={{ color: colors.text }}>Error: {error} (toca para reintentar)</Text>
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
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.navRow}>
          <TouchableOpacity onPress={goPrev} style={[styles.navBtn, { borderColor: colors.border }]}>
            <Text style={{ color: colors.text }}>← Anterior</Text>
          </TouchableOpacity>
          <Text style={{ color: colors.text }}>{data.date}</Text>
          <TouchableOpacity
            onPress={goNext}
            style={[styles.navBtn, { borderColor: colors.border, opacity: date ? 1 : 0.3 }]}
            disabled={!date}
          >
            <Text style={{ color: colors.text }}>Siguiente →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <TouchableOpacity onPress={openPicker} style={[styles.pickerBtn, { borderColor: colors.border }]}>
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

        <View style={styles.imageWrapper}>
  {!loaded && <AsteroidLoader size={64} />}
  
  <Animated.Image
    source={{ uri: imageUrl }}
    onLoadEnd={() => {
      setLoaded(true);
      fade.value = withTiming(1, { duration: 800 });
    }}
    style={[styles.image, fadeStyle, { position: 'absolute' }]}
    resizeMode="cover"
  />
</View>

        {data.media_type === 'video' && (
          <TouchableOpacity onPress={() => Linking.openURL(data.url)} style={{ padding: 16 }}>
            <Text style={{ color: '#1e90ff' }}>🔗 Ver video en línea</Text>
          </TouchableOpacity>
        )}

        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: colors.text }]}>{data.title}</Text>
          <Text style={{ color: colors.text, marginTop: 8 }}>{data.explanation}</Text>
        </View>
      </ScrollView>
    </FadeInWrapper>
  );
}

const styles = StyleSheet.create({
  center: { justifyContent: 'center', alignItems: 'center' },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  navBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  imageWrapper: {
  width: '100%',
  height: 300,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 12,
  overflow: 'hidden',
  backgroundColor: '#00000020', // placeholder sutil
  marginVertical: 12,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginTop: 12,
  },
  pickerBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  textBlock: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
});
