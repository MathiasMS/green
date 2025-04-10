import React, { useEffect, useState } from 'react';
import { View, Modal, Button, TouchableOpacity, Text } from 'react-native';
import { useAppointment } from '@/src/providers/AppointmentContext';
import { AppButtonContainer, AppButton, AppSelect, AppSubheading } from '@/src/components/ui';
import { argentinaStatesOptions } from '@/src/data/argentinaStates';
import { specializationService } from '@/src/contexts/appointment/container';
import { SelectItem } from '@/src/components/ui/AppSelect';

const SearchModal = ({
  visible,
  onClose,
  onUpdate,
}: {
  visible: boolean;
  onClose: () => void;
  onUpdate: () => void;
}) => {
  const { specialization, setSpecialization, location, setLocation } = useAppointment();
  const [specializations, setSpecializations] = useState<SelectItem[]>([]);

  const handleSelectSpecialization = (item: SelectItem) => {
    setSpecialization({
      id: item.value,
      name: item.label,
    });
  };

  const handleSelectLocation = (item: SelectItem) => {
    setLocation(item.value);
  };

  const handleUpdate = () => {
    onUpdate();
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
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View className="flex-1 justify-center items-center">
        <View className="bg-white dark:bg-gray-800 rounded-xl p-4 w-4/5 border border-gray-300 dark:border-gray-600">
          <AppSubheading className="text-center mb-4 text-lg font-bold">
            Edita tu búsqueda
          </AppSubheading>
          <AppSelect
            items={specializations}
            value={specialization?.id || ''}
            onValueChange={handleSelectSpecialization}
            placeholder="Selecciona una especialidad"
          />
          <AppSelect
            items={argentinaStatesOptions}
            value={location}
            onValueChange={handleSelectLocation}
            placeholder="Selecciona una ubicación"
          />
          <AppButtonContainer>
            <AppButton
              onPress={onClose}
              title="Cancelar"
              variant="primary"
              appearance="ghost"
              className="flex-1 mr-2"
            />
            <AppButton
              onPress={handleUpdate}
              title="Actualizar"
              variant="primary"
              className="flex-1 ml-2"
            />
          </AppButtonContainer>
        </View>
      </View>
    </Modal>
  );
};

export default SearchModal;
