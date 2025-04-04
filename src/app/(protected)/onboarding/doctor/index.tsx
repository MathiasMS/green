import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { DoctorParams } from '@/src/contexts/profile/domain/doctor/Doctor';
import { useAuth } from '@/src/hooks/useAuth';
import { doctorService } from '@/src/contexts/profile/container';
import { titleOptions } from '@/src/data/titles';
import { router } from 'expo-router';
import { useOnboarding } from '@/src/providers/OnboardingContext';
import { ProfileType } from '@/src/providers/AuthContext';
import { generateUUID } from '@/src/utils/uuid';
import AppLayout from '@/src/components/ui/AppLayout';
import AppTitle from '@/src/components/ui/AppTitle';
import { TextFormField, SelectFormField, DatepickerFormField } from '@/src/components/form';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  AppButtonContainer,
  AppScrollContainer,
  AppButton,
  AppSubtitle,
} from '@/src/components/ui';
import NumericFormField from '@/src/components/form/NumericFormField';

export default function DoctorOnboardingStep1() {
  const { authState, setProfileType } = useAuth();
  const { doctorData, setDoctorData, clearOnboardingData } = useOnboarding();
  const { control, handleSubmit, reset } = useForm<DoctorParams>();
  const [loading, setLoading] = useState(false);

  // Load existing doctor data if available
  useEffect(() => {
    if (doctorData) {
      reset(doctorData);
    }
  }, [doctorData, reset]);

  const onSubmit = async (data: DoctorParams) => {
    try {
      setLoading(true);
      const newDoctorData: DoctorParams = {
        ...data,
        id: doctorData?.id || generateUUID(),
        userId: authState.user?.id || '',
      };

      let createdDoctor;
      if (doctorData?.id) {
        // Update existing doctor
        createdDoctor = await doctorService.update(doctorData.id, newDoctorData);
      } else {
        // Create new doctor
        createdDoctor = await doctorService.create(newDoctorData);
      }

      // Update context with the latest data
      setDoctorData(createdDoctor);
      setProfileType(ProfileType.DOCTOR);

      // Navigate to next step with doctor ID
      router.push({
        pathname: '/(protected)/onboarding/doctor/[doctorId]/office',
        params: { doctorId: createdDoctor.id },
      });
    } catch (error) {
      console.error('Error saving doctor data:', error);
      // Handle error (e.g., show error message)
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    clearOnboardingData();
    router.back();
  };

  return (
    <AppLayout>
      <GestureHandlerRootView className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <AppScrollContainer keyboardShouldPersistTaps="handled">
            <AppTitle className="text-center mb-2">Datos del profesional</AppTitle>
            <AppSubtitle className="text-center mb-5">
              Completa con los datos correspondientes al profesional que estas cargando
            </AppSubtitle>

            <TextFormField
              control={control}
              name="firstName"
              label="Nombre"
              required
              errorMessage="El nombre es obligatorio"
            />

            <TextFormField
              control={control}
              name="lastName"
              label="Apellido"
              required
              errorMessage="El apellido es obligatorio"
            />

            <SelectFormField
              control={control}
              name="title"
              label="Prefijo"
              errorMessage="El título es obligatorio"
              options={titleOptions}
            />

            <DatepickerFormField
              control={control}
              name="birthDate"
              label="Fecha de Nacimiento"
              required
              errorMessage="La fecha de nacimiento es obligatoria"
              maximumDate={new Date()}
            />

            <NumericFormField
              control={control}
              name="phone"
              label="Teléfono"
              required
              errorMessage="El teléfono es obligatorio"
              keyboardType="phone-pad"
            />

            <DatepickerFormField
              control={control}
              name="practicingFrom"
              label="Ejerciendo desde"
              errorMessage="La fecha de inicio de práctica es obligatoria"
              maximumDate={new Date()}
            />

            <TextFormField
              control={control}
              isTextArea
              name="professionalStatement"
              label="Resumen profesional"
              errorMessage="El resumen profesional es obligatorio"
            />
          </AppScrollContainer>

          <AppButtonContainer>
            <AppButton
              onPress={handleCancel}
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
