import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useAssets } from '../../presentation/viewmodels/assets/useAssets';
import { useTheme } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsteroidLoader from '../components/AsteroidLoader';
import FadeInWrapper from '../components/FadeInWrapper';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type Form = { q: string; media: 'image' | 'video' | 'audio' | '' };

export default function AssetSearchScreen() {
  const { colors } = useTheme();
  const { items, status, search, loadMore } = useAssets();
  const { control, handleSubmit } = useForm<Form>({ defaultValues: { q: '', media: '' } });

  // Fondo animado al cambiar de tema
  const bg = useSharedValue(colors.background);

  useEffect(() => {
    bg.value = withTiming(colors.background, { duration: 400 });
  }, [colors.background]);

  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: bg.value,
    flex: 1,
  }));

  const onSubmit = (d: Form) => {
    search(d.q, d.media || undefined);
  };

  return (
    <FadeInWrapper>
      <Animated.View style={bgStyle}>
        {/* Formulario */}
        <View style={[styles.form, { backgroundColor: colors.card }]}>
          <Controller
            control={control}
            name="q"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Buscar..."
                value={value}
                onChangeText={onChange}
                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                placeholderTextColor={colors.border}
              />
            )}
          />
          <Controller
            control={control}
            name="media"
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
                dropdownIconColor={colors.text}
              >
                <Picker.Item label="Todos" value="" />
                <Picker.Item label="Imágenes" value="image" />
                <Picker.Item label="Videos" value="video" />
                <Picker.Item label="Audios" value="audio" />
              </Picker>
            )}
          />
          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {/* Resultados */}
        {status === 'loading' && items.length === 0 ? (
          <AsteroidLoader />
        ) : (
          <FlatList
            data={items}
            numColumns={2}
            keyExtractor={i => i.nasaId}
            contentContainerStyle={{ padding: 8 }}
            onEndReached={loadMore}
            onEndReachedThreshold={0.4}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card}>
                <Image source={{ uri: item.thumbUrl }} style={styles.thumb} />
                <Text numberOfLines={2} style={[styles.title, { color: colors.text }]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
            ListFooterComponent={
              status === 'loading' ? <AsteroidLoader /> : null
            }
          />
        )}
      </Animated.View>
    </FadeInWrapper>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 12,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  card: {
    flex: 1,
    margin: 4,
    backgroundColor: '#2222',
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumb: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  title: {
    fontSize: 12,
    marginTop: 4,
    paddingHorizontal: 4,
    paddingBottom: 6,
  },
});
