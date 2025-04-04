import React, { useState } from 'react';
import { StyleSheet, Alert, ScrollView, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { AppTitle, AppScrollContainer, AppLayout, AppButton } from '@/src/components/ui';
import { EmailFormField, PasswordFormField } from '@/src/components/form';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      Alert.alert('Error', 'Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <AppScrollContainer className="p-5">
        <AppTitle className="text-center">Iniciar Sesión</AppTitle>

        <EmailFormField control={control} name="email" label="Correo electrónico" />

        <PasswordFormField control={control} name="password" label="Contraseña" />

        <AppButton
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          title={loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          variant="primary"
        />
      </AppScrollContainer>
    </AppLayout>
  );
}
