import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { OfficeParams } from '@/src/contexts/profile/domain/office/Office';
import { officeService } from '@/src/contexts/profile/container';
import { argentinaStates } from '@/src/data/argentinaStates';

import { router, useLocalSearchParams } from 'expo-router';
import { useOnboarding } from '@/src/providers/OnboardingContext';
import AppLayout from '@/src/components/ui/AppLayout';
import AppTitle from '@/src/components/ui/AppTitle';
import { TextFormField, SelectFormField, NumericFormField } from '@/src/components/form';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  AppButtonContainer,
  AppScrollContainer,
  AppButton,
  AppSubtitle,
} from '@/src/components/ui';
import { consultationTypeOptions } from '@/src/data/consultationType';
import { generateUUID } from '@/src/utils/uuid';

export default function DoctorOffice() {
  const { doctorId } = useLocalSearchParams<{ doctorId: string }>();
  const { officeData, setOfficeData } = useOnboarding();
  const { control, handleSubmit, reset } = useForm<OfficeParams>({
    defaultValues: {
      email: '',
      firstConsultationFee: 0,
    },
  });
  const [loading, setLoading] = useState(false);

  // Load existing office data if available
  useEffect(() => {
    if (officeData) {
      reset(officeData);
    }
  }, [officeData, reset]);

  const onSubmit = async (data: OfficeParams) => {
    try {
      setLoading(true);
      const newOfficeData: OfficeParams = {
        ...data,
        // timeSlotPerClientInMin: Number(data.timeSlotPerClientInMin),
        id: officeData?.id || generateUUID(), // Use existing ID if available
        doctorId: doctorId || '',
      };

      let createdOffice;
      if (officeData?.id) {
        // Update existing office
        createdOffice = await officeService.update(officeData.id, newOfficeData);
      } else {
        // Create new office
        createdOffice = await officeService.create(newOfficeData);
      }

      // Update context with the latest data
      setOfficeData(createdOffice);

      // Navigate to next step
      router.push({
        pathname: '/(protected)/onboarding/doctor/[doctorId]/office/[officeId]/schedule',
        params: { doctorId, officeId: createdOffice.id },
      });
    } catch (error) {
      console.error('Error saving office data:', error);
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
      <GestureHandlerRootView className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <AppScrollContainer keyboardShouldPersistTaps="handled">
            <AppTitle className="text-center mb-2">Datos del consultorio</AppTitle>
            <AppSubtitle className="text-center mb-5">
              Completar con los datos del consultorio donde atendera el profesional
            </AppSubtitle>

            <SelectFormField
              control={control}
              name="consultationType"
              label="Tipo de consulta"
              errorMessage="Tipo de consulta"
              options={consultationTypeOptions}
            />

            <TextFormField
              control={control}
              name="streetAddress"
              label="Calle y número"
              required
              errorMessage="La dirección es obligatoria"
            />

            <TextFormField control={control} name="apartment" label="Piso/Departamento" />

            <NumericFormField
              control={control}
              name="zip"
              label="Código Postal"
              required
              errorMessage="El código postal es obligatorio"
            />

            <TextFormField
              control={control}
              name="city"
              label="Localidad/Ciudad"
              required
              errorMessage="La ciudad es obligatoria"
            />

            <SelectFormField
              control={control}
              name="state"
              label="Provincia"
              required
              errorMessage="La provincia es obligatoria"
              options={argentinaStates.map(state => ({ label: state, value: state }))}
            />

            <NumericFormField
              control={control}
              name="phone"
              label="Teléfono"
              required
              errorMessage="El teléfono es obligatorio"
              keyboardType="phone-pad"
            />

            <TextFormField
              control={control}
              name="email"
              label="Correo electrónico"
              required
              infoMessage="Este correo electrónico será visible para los pacientes"
              errorMessage="El correo electrónico es obligatorio"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <NumericFormField
              control={control}
              name="timeSlotPerClientInMin"
              label="Duración de la consulta (minutos)"
              required
              errorMessage="La duración de la consulta es obligatoria"
            />

            <TextFormField
              control={control}
              name="firstConsultationFee"
              label="Precio consulta"
              required
              errorMessage="El precio de la consulta es obligatorio"
              keyboardType="numeric"
            />
          </AppScrollContainer>

          <AppButtonContainer>
            <AppButton
              onPress={handleBack}
              title="Atrás"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7,
  },
  formContainer: {
    gap: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: '#E4E9F2',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});
