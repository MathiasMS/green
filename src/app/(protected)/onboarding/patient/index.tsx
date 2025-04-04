import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { PatientParams } from '@/src/contexts/profile/domain/patient/Patient';
import { useAuth } from '@/src/hooks/useAuth';
import { patientService } from '@/src/contexts/profile/container';
import { argentinaStates } from '@/src/data/argentinaStates';
import { generateUUID } from '@/src/utils/uuid';
import { router } from 'expo-router';
import { ProfileType } from '@/src/providers/AuthContext';
import AppLayout from '@/src/components/ui/AppLayout';
import AppTitle from '@/src/components/ui/AppTitle';
import { TextFormField, SelectFormField, DatepickerFormField } from '@/src/components/form';
import AppButton from '@/src/components/ui/AppButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppButtonContainer, AppScrollContainer, AppSubtitle } from '@/src/components/ui';

export default function RegisterForm() {
  const { authState, setProfileType } = useAuth();
  const { control, handleSubmit } = useForm<PatientParams>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: PatientParams) => {
    try {
      setLoading(true);
      const patientData: PatientParams = {
        ...data,
        id: generateUUID(),
        userId: authState.user?.id || '',
      };

      await patientService.create(patientData);

      setProfileType(ProfileType.PATIENT);

      router.replace('/patient');
    } catch (error) {
      console.error('Error creating patient:', error);
      // Handle error (e.g., show error message)
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <AppLayout>
      <GestureHandlerRootView>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <AppScrollContainer className="p-5" keyboardShouldPersistTaps="handled">
            <AppTitle className="text-center mb-2">Registro de Paciente</AppTitle>

            <AppSubtitle className="text-center mb-5">
              Completa con los datos correspondientes al paciente que estas cargando
            </AppSubtitle>

            <TextFormField
              control={control}
              name="lastName"
              label="Apellido"
              required
              errorMessage="El apellido es obligatorio"
              className="mb-4"
            />

            <TextFormField
              control={control}
              name="firstName"
              label="Nombre"
              required
              errorMessage="El nombre es obligatorio"
              className="mb-4"
            />

            <TextFormField
              control={control}
              name="phone"
              label="Teléfono"
              required
              errorMessage="El teléfono es obligatorio"
              keyboardType="phone-pad"
              className="mb-4"
            />

            <TextFormField
              control={control}
              name="streetAddress"
              label="Dirección"
              errorMessage="La dirección es obligatoria"
              className="mb-4"
            />

            <TextFormField
              control={control}
              name="city"
              label="Ciudad"
              errorMessage="La ciudad es obligatoria"
              className="mb-4"
            />

            <SelectFormField
              control={control}
              name="state"
              label="Provincia"
              errorMessage="La provincia es obligatoria"
              options={argentinaStates.map(state => ({ label: state, value: state }))}
              className="mb-4"
            />

            <TextFormField
              control={control}
              name="zip"
              label="Código Postal"
              errorMessage="El código postal es obligatorio"
              className="mb-4"
            />

            <DatepickerFormField
              control={control}
              name="birthDate"
              label="Fecha de Nacimiento"
              required
              errorMessage="La fecha de nacimiento es obligatoria"
              maximumDate={new Date()}
              className="mb-4"
            />
          </AppScrollContainer>

          <AppButtonContainer>
            <AppButton
              onPress={handleBack}
              title="Cancelar"
              variant="primary"
              appearance="ghost"
              className="flex-1 mr-2"
            />
            <AppButton
              onPress={handleSubmit(onSubmit)}
              title={loading ? 'Guardando...' : 'Siguiente'}
              variant="primary"
              loading={loading}
              className="flex-1 ml-2"
            />
          </AppButtonContainer>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </AppLayout>
  );
}
