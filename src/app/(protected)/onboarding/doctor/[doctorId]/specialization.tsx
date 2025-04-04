import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
  Text,
  FlatList,
  TextInput,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useOnboarding } from '@/src/providers/OnboardingContext';
import { specializationService } from '@/src/contexts/profile/container';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppLayout from '@/src/components/ui/AppLayout';
import AppTitle from '@/src/components/ui/AppTitle';
import {
  AppButtonContainer,
  AppScrollContainer,
  AppButton,
  AppSubtitle,
} from '@/src/components/ui';
import { Specialization } from '@/src/contexts/profile/domain/specialization/Specialization';
import { Feather } from '@expo/vector-icons';

export default function DoctorSpecialization() {
  const { doctorId } = useLocalSearchParams<{ doctorId: string }>();
  const { specializationData, setSpecializationData } = useOnboarding();
  const [loading, setLoading] = useState(false);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] = useState<Specialization[]>([]);

  useEffect(() => {
    const loadSpecializations = async () => {
      try {
        const data = await specializationService.findAll();
        setSpecializations(data);
      } catch (error) {
        console.error('Error loading specializations:', error);
      }
    };

    loadSpecializations();
  }, []);

  useEffect(() => {
    // Initialize selected specializations from context if available
    if (specializationData && specializationData.length > 0) {
      setSelectedSpecializations(specializationData);
    }
  }, [specializationData]);

  const filteredSpecializations = specializations.filter(spec =>
    spec.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectSpecialization = (specialization: Specialization) => {
    if (!selectedSpecializations.some(spec => spec.id === specialization.id)) {
      const updatedSpecializations = [...selectedSpecializations, specialization];
      setSelectedSpecializations(updatedSpecializations);
      setSpecializationData(updatedSpecializations);
    } else {
      setSelectedSpecializations(
        selectedSpecializations.filter(spec => spec.id !== specialization.id)
      );
      setSpecializationData(selectedSpecializations.filter(spec => spec.id !== specialization.id));
    }
  };

  const handleRemoveSpecialization = (id: string) => {
    const updatedSpecializations = selectedSpecializations.filter(spec => spec.id !== id);
    setSelectedSpecializations(updatedSpecializations);
    setSpecializationData(updatedSpecializations);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      // Delete existing specializations
      await specializationService.deleteDoctorSpecializations(doctorId);

      // Create new specializations
      const selectedSpecializationIds = selectedSpecializations.map(spec => spec.id) || [];
      await specializationService.createDoctorSpecializations(doctorId, selectedSpecializationIds);

      router.replace('/doctor');
      setSpecializationData(selectedSpecializations);
    } catch (error) {
      console.error('Error saving specializations:', error);
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
            <AppTitle className="text-center mb-2">Especialidades</AppTitle>
            <AppSubtitle className="text-center mb-5">
              Selecciona las especialidades en las que te desempeñas
            </AppSubtitle>

            <View className="p-4">
              <Pressable
                className="bg-gray-100 flex-row items-center p-4 rounded-lg border border-gray-300 mb-4"
                onPress={() => setIsModalVisible(true)}
              >
                <Feather name="search" size={20} color="gray" />
                <Text className="ml-2 text-gray-700">Buscar especialidad</Text>
              </Pressable>

              <View className="mb-5">
                {selectedSpecializations.map(specialization => (
                  <View
                    key={specialization.id}
                    className="flex-row items-center justify-between p-3 mb-2 border border-gray-300 rounded-lg"
                  >
                    <Text className="text-gray-900">{specialization.name}</Text>
                    <Pressable onPress={() => handleRemoveSpecialization(specialization.id)}>
                      <Feather name="x" size={20} color="gray" />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>
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
              onPress={onSubmit}
              title={loading ? 'Guardando...' : 'Siguiente'}
              variant="primary"
              loading={loading}
              className="flex-1 ml-2"
            />
          </AppButtonContainer>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <Pressable
          className="flex-1 justify-end bg-black/50"
          onPress={() => setIsModalVisible(false)}
        >
          <View className="bg-white rounded-t-xl p-4 max-h-[60%]">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold text-gray-900">Seleccionar especialidad</Text>
              <Pressable onPress={() => setIsModalVisible(false)}>
                <Feather name="x" size={24} color="gray" />
              </Pressable>
            </View>

            <View className="bg-gray-100 p-3 rounded-lg mb-4 flex-row items-center">
              <Feather name="search" size={20} color="gray" />
              <TextInput
                className="flex-1 ml-2 text-gray-900"
                placeholder="Buscar..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <FlatList
              data={filteredSpecializations}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelectSpecialization(item)}
                  className={`p-3 ${
                    selectedSpecializations.some(spec => spec.id === item.id)
                      ? 'bg-sky-100'
                      : 'bg-white'
                  }`}
                >
                  <Text
                    className={`${
                      selectedSpecializations.some(spec => spec.id === item.id)
                        ? 'text-sky-600'
                        : 'text-gray-900'
                    }`}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />

            <Pressable
              onPress={() => setIsModalVisible(false)}
              className="mt-4 p-3 bg-gray-100 rounded-lg"
            >
              <Text className="text-center text-gray-900">Cancelar</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </AppLayout>
  );
}
