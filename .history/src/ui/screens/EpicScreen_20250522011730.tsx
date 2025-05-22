import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
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

const { width } = Dimensions.get('window');

export default function EpicScreen() {
  const today = dayjs().subtract(1, 'day').format('YYYY-MM-DD'); 
  const [date, setDate] = useState(today);
  const [showPicker, setShowPicker] = useState(false);

  const { colors } = useTheme();
  const { images, status, error, refresh } = useEpicImages(date);

  const onChange = (_: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS !== 'ios') setShowPicker(false);
    if (selected) setDate(dayjs(selected).format('YYYY-MM-DD'));
  };


  if (status === 'loading')
    return <ActivityIndicator style={styles.center} size="large" color={colors.text} />;

  if (status === 'failed')
    return (
      <TouchableOpacity onPress={refresh} style={styles.center}>
        <Text style={{ color: colors.text }}>
          Error: {error} (toca para reintentar)
        </Text>
      </TouchableOpacity>
    );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Selector de fecha */}
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateBtn}>
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

      {/* Carrusel */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1 },
  dateBtn: { alignSelf: 'center', marginVertical: 8 },
  image: { width, height: width }, 
});