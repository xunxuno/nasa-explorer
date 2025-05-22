import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet, TextInput, Button , ActivityIndicator 
} from 'react-native';
import { Controller, useForm, } from 'react-hook-form';
import { useAssets } from '../../presentation/viewmodels/assets/useAssets';
import { useTheme } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

type Form = { q: string; media: 'image' | 'video' | 'audio' | '' };

export default function AssetSearchScreen() {
  const { colors } = useTheme();
  const { items, status, search, loadMore } = useAssets();
  const { control, handleSubmit } = useForm<Form>({ defaultValues: { q: '', media: '' } });

  const onSubmit = (d: Form) => search(d.q, d.media || undefined);

  return (
    <View style={{ flex: 1 }}>
      {/* Formulario */}
      <View style={[styles.form, { backgroundColor: colors.card }]}>
        <Controller
          control={control}
          name="q"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput placeholder="Buscar..." value={value} onChangeText={onChange} />
          )}
        />
        <Controller
          control={control}
          name="media"
          render={({ field: { onChange, value } }) => (
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="Todos" value="" />
              <Picker.Item label="Imágenes" value="image" />
              <Picker.Item label="Videos" value="video" />
              <Picker.Item label="Audios" value="audio" />
            </Picker>
          )}
        />
        <Button title="Buscar" onPress={handleSubmit(onSubmit)} />
      </View>

      {/* Resultados */}
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
          status === 'loading' ? <ActivityIndicator style={{ margin: 16 }} /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { padding: 8 },
  card: { flex: 1, margin: 4 },
  thumb: { width: '100%', aspectRatio: 1, borderRadius: 8 },
  title: { fontSize: 12, marginTop: 4 },
});