import {
  AppButton,
  AppButtonContainer,
  AppLayout,
  AppParagraph,
  AppScrollContainer,
} from '@/src/components/ui';
import { AppSelect } from '@/src/components/ui';
import { AppHeading } from '@/src/components/ui';
import { SelectItem } from '@/src/components/ui/AppSelect';
import { argentinaStatesOptions } from '@/src/data/argentinaStates';
import { useAppointment } from '@/src/providers/AppointmentContext';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

const LocationStep = () => {
  const router = useRouter();
  const { location, setLocation } = useAppointment();

  const handleCancel = () => {
    router.dismiss();
  };

  const handleNext = () => {
    router.push('/(protected)/patient/(modals)/specialization');
  };

  const handleSelectLocation = (item: SelectItem) => {
    setLocation(item.value);
  };

  return (
    <AppLayout>
      <AppScrollContainer className="p-5">
        <AppHeading className="text-center">Ubicación</AppHeading>
        <View className="mb-4">
          <AppParagraph className="text-gray-600 text-center">
            Selecciona la ubicación donde necesitas la consulta
          </AppParagraph>
        </View>
        <AppSelect
          items={argentinaStatesOptions}
          value={location}
          onValueChange={handleSelectLocation}
          placeholder="Selecciona una ubicación"
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
          disabled={!location}
          onPress={handleNext}
          title="Siguiente"
          variant="primary"
          className="flex-1 ml-2"
        />
      </AppButtonContainer>
    </AppLayout>
  );
};

export default LocationStep;
