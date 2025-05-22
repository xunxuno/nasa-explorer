import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useTheme } from '@react-navigation/native';

type FormData = {
  nombre: string;
  mensaje: string;
};

export default function ContactScreen() {
  const { control, handleSubmit, reset } = useForm<FormData>();
  const { colors } = useTheme();

  const onSubmit = (data: FormData) => {
    Alert.alert("Mensaje enviado", `Gracias, ${data.nombre}!`);
    reset();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>📬 Contáctanos</Text>

      <Controller
        control={control}
        name="nombre"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Tu nombre"
            value={value}
            onChangeText={onChange}
            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
            placeholderTextColor={colors.border}
          />
        )}
      />

      <Controller
        control={control}
        name="mensaje"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Tu mensaje"
            value={value}
            onChangeText={onChange}
            multiline
            style={[styles.input, styles.textarea, { color: colors.text, borderColor: colors.border }]}
            placeholderTextColor={colors.border}
          />
        )}
      />

      <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
