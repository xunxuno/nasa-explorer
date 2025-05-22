import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import dayjs from 'dayjs';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useEpicImages } from '../../presentation/viewmodels/epic/useEpicImages';
import { useTheme } from '@react-navigation/native';
import AsteroidLoader from '../components/AsteroidLoader';
import FadeInWrapper from '../components/FadeInWrapper';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function EpicScreen() {
  const today = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  const [date, setDate] = useState(today);
  const [showPicker, setShowPicker] = useState(false);

  const { colors } = useTheme();
  const { images, status, error, refresh } = useEpicImages(date);

  const bg = useSharedValue(colors.background);
  useEffect(() => {
    bg.value = withTiming(colors.background, { duration: 400 });
  }, [colors.background]);

  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: bg.value,
    flex: 1,
  }));

  const onChange = (_: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS !== 'ios') setShowPicker(false);
    if (selected) setDate(dayjs(selected).format('YYYY-MM-DD'));
  };

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
      <Animated.View style={bgStyle}>
        <TouchableOpacity onPress={() => setShowPicker(true)} style={[styles.dateBtn, { borderColor: colors.border }]}>
          <Text style={{ color: colors.text }}>📅 {date}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={dayjs(date).toDate()}
            mode="date"
            maximumDate={new Date()}
            onChange={onChange}
          />
        )}

        <FlatList
          data={images}
          horizontal
          pagingEnabled
          keyExtractor={uri => uri}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
          )}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={{ color: colors.text, padding: 16 }}>
                No hay imágenes para la fecha seleccionada.
              </Text>
            </View>
          }
        />
      </Animated.View>
    </FadeInWrapper>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  dateBtn: {
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#1e90ff10',
  },
  image: {
    width: width * 0.9,
    height: width * 0.9,
    alignSelf: 'center',
    marginVertical: 16,
    borderRadius: 16,
  },
});
