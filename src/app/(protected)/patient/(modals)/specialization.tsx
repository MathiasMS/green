import {
  AppLayout,
  AppButtonContainer,
  AppButton,
  AppHeading,
  AppParagraph,
  AppSelect,
} from '@/src/components/ui';
import { AppScrollContainer } from '@/src/components/ui';
import { useAppointment } from '@/src/providers/AppointmentContext';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { specializationService } from '@/src/contexts/appointment/container';
import { View } from 'react-native';
import { SelectItem } from '@/src/components/ui/AppSelect';

const Specialization = () => {
  const router = useRouter();
  const { specialization, setSpecialization } = useAppointment();
  const [specializations, setSpecializations] = useState<SelectItem[]>([]);

  const handleCancel = () => {
    router.dismiss();
  };

  const handleNext = () => {
    router.push('/(protected)/patient/(modals)/doctors');
  };

  const handleSelectSpecialization = (item: SelectItem) => {
    setSpecialization({
      id: item.value,
      name: item.label,
    });
  };

  useEffect(() => {
    const loadSpecializations = async () => {
      try {
        const specializations = await specializationService.findAll();

        const specializationsOptions = specializations.map(specialization => ({
          value: specialization.id,
          label: specialization.name,
        }));

        setSpecializations(specializationsOptions);
      } catch (error) {
        console.error('Error loading specializations:', error);
      }
    };

    loadSpecializations();
  }, []);

  return (
    <AppLayout>
      <AppScrollContainer className="p-5">
        <AppHeading className="text-center">Especialidad</AppHeading>
        <View className="mb-4">
          <AppParagraph className="text-gray-600 text-center">
            Selecciona la especialidad que buscas
          </AppParagraph>
        </View>
        <AppSelect
          items={specializations}
          value={specialization?.id || ''}
          onValueChange={handleSelectSpecialization}
          placeholder="Selecciona una especialidad"
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
          disabled={!specialization?.id}
          onPress={handleNext}
          title="Siguiente"
          variant="primary"
          className="flex-1 ml-2"
        />
      </AppButtonContainer>
    </AppLayout>
  );
};

export default Specialization;
