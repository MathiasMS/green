import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { AppTitle, AppScrollContainer, AppLayout, AppButton } from '@/src/components/ui';
import { EmailFormField, PasswordFormField } from '@/src/components/form';

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupScreen() {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, watch } = useForm<SignUpFormData>();

  const validateConfirmPassword = (value: string) =>
    value === watch('password') ? undefined : 'Las contraseñas no coinciden';

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      await signUp(data.email, data.password);
      Alert.alert('Éxito', '¡Cuenta creada exitosamente!');
    } catch (error) {
      console.error('Error de registro:', JSON.stringify(error, null, 2));
      Alert.alert('Error', 'Hubo un problema al crear tu cuenta. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <AppScrollContainer>
        <AppTitle className="text-center">Registro</AppTitle>

        <EmailFormField control={control} name="email" label="Correo electrónico" />

        <PasswordFormField control={control} name="password" label="Contraseña" />

        <PasswordFormField
          control={control}
          name="confirmPassword"
          label="Confirmar contraseña"
          validateRule={validateConfirmPassword}
        />

        <AppButton
          onPress={handleSubmit(onSubmit)}
          title={loading ? 'Registrando...' : 'Registrarse'}
          variant="primary"
          loading={loading}
        />
      </AppScrollContainer>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
