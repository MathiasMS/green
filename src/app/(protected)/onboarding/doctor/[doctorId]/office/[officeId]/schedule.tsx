import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  Modal,
  FlatList,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { officeDoctorAvailabilityService } from '@/src/contexts/profile/container';
import {
  DayOfWeek,
  OfficeDoctorAvailability,
} from '@/src/contexts/profile/domain/officeDoctorAvailability/OfficeDoctorAvailability';
import { useOnboarding } from '@/src/providers/OnboardingContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppLayout from '@/src/components/ui/AppLayout';
import AppTitle from '@/src/components/ui/AppTitle';
import {
  AppButtonContainer,
  AppScrollContainer,
  AppButton,
  AppSubtitle,
  AppParagraph,
} from '@/src/components/ui';
import { Feather } from '@expo/vector-icons';
import {
  DaysSelected,
  ScheduleRange,
  Days,
  DayId,
  DayName,
  generateScheduleTimes,
} from '@/src/utils/schedule';

const ScheduleTimes = generateScheduleTimes();

// Custom Time Selector Component
const TimeSelector = ({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (value: string) => void;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View>
      <Pressable
        onPress={() => setIsModalVisible(true)}
        className="border rounded-lg p-3 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
      >
        <Text className="text-gray-900 dark:text-white">{value}</Text>
      </Pressable>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white dark:bg-gray-800 rounded-t-xl p-4 max-h-[60%]">
            <Text className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Seleccionar hora
            </Text>
            <FlatList
              data={ScheduleTimes}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onSelect(item);
                    setIsModalVisible(false);
                  }}
                  className={`p-3 ${
                    value === item ? 'bg-sky-100 dark:bg-sky-900' : 'bg-white dark:bg-gray-800'
                  }`}
                >
                  <Text
                    className={`${
                      value === item
                        ? 'text-sky-600 dark:text-sky-300'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
            <Pressable
              onPress={() => setIsModalVisible(false)}
              className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <Text className="text-center text-gray-900 dark:text-white">Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const OfficeScheduleScreen = () => {
  const { officeId, doctorId } = useLocalSearchParams<{ officeId: string; doctorId: string }>();
  const { scheduleData, setScheduleData } = useOnboarding();
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState<DaysSelected>({
    L: true,
    M: true,
    X: true,
    J: true,
    V: true,
    S: false,
    D: false,
  });

  const [schedules, setSchedules] = useState<ScheduleRange>({
    Lunes: [{ startTime: '08:30', endTime: '11:30' }],
    Martes: [{ startTime: '08:30', endTime: '11:30' }],
    Miércoles: [{ startTime: '08:30', endTime: '11:30' }],
    Jueves: [{ startTime: '08:30', endTime: '11:30' }],
    Viernes: [{ startTime: '08:30', endTime: '11:30' }],
    Sábado: [{ startTime: '08:30', endTime: '11:30' }],
    Domingo: [{ startTime: '08:30', endTime: '11:30' }],
  });

  // Load existing availabilities from context or API
  useEffect(() => {
    const loadAvailabilities = async () => {
      if (officeId) {
        try {
          let availabilities: OfficeDoctorAvailability[] = [];

          if (!scheduleData) {
            return;
          }

          if (scheduleData.length > 0) {
            availabilities = scheduleData;
            // Update schedules with existing data
            const newSchedules: ScheduleRange = {
              Lunes: [],
              Martes: [],
              Miércoles: [],
              Jueves: [],
              Viernes: [],
              Sábado: [],
              Domingo: [],
            };

            availabilities.forEach(availability => {
              if (availability.isAvailable) {
                newSchedules[availability.dayOfWeek].push({
                  startTime: availability.startTime,
                  endTime: availability.endTime,
                });
              }
            });

            // Update selected days based on existing schedules
            const newSelectedDays: DaysSelected = {
              L: newSchedules.Lunes.length > 0,
              M: newSchedules.Martes.length > 0,
              X: newSchedules.Miércoles.length > 0,
              J: newSchedules.Jueves.length > 0,
              V: newSchedules.Viernes.length > 0,
              S: newSchedules.Sábado.length > 0,
              D: newSchedules.Domingo.length > 0,
            };

            setSchedules(newSchedules);
            setSelectedDays(newSelectedDays);
          }
        } catch (error) {
          console.error('Error loading availabilities:', error);
        }
      }
    };

    loadAvailabilities();
  }, [officeId, scheduleData, setScheduleData]);

  // Manejar selección de día
  const handleDaySelection = (id: DayId) => {
    const newSelectedDays = { ...selectedDays };
    newSelectedDays[id] = !newSelectedDays[id];
    setSelectedDays(newSelectedDays);

    // Si se selecciona un día que no tenía horarios, agregar uno por defecto
    const foundDay = Days.find(day => day.id === id);
    if (!foundDay) return;
    const dayName = foundDay.name;

    if (!selectedDays[id] && schedules[dayName].length === 0) {
      const newSchedules = { ...schedules };
      newSchedules[dayName] = [{ startTime: '08:30', endTime: '11:30' }];
      setSchedules(newSchedules);
    }
  };

  // Agregar un nuevo rango de horario para un día
  const handleAddScheduleRange = (day: DayName) => {
    const newSchedules = { ...schedules };
    newSchedules[day] = [...newSchedules[day], { startTime: '08:30', endTime: '11:30' }];
    setSchedules(newSchedules);
  };

  // Actualizar horario de inicio o fin
  const updateSchedule = (day: DayName, index: number, type: string, value: string) => {
    const newSchedules = { ...schedules };
    newSchedules[day][index][type as keyof { startTime: string; endTime: string }] = value;
    setSchedules(newSchedules);
  };

  const handleBack = () => {
    router.back();
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      // Delete existing availabilities
      if (officeId) {
        await officeDoctorAvailabilityService.deleteByOfficeId(officeId);
      }

      // Convert schedules to OfficeDoctorAvailability format
      const availabilities = Object.entries(schedules).flatMap(([dayName, ranges]) => {
        const dayId = Days.find(day => day.name === dayName)?.id as DayId;
        if (!selectedDays[dayId]) return [];

        return ranges.map(range => ({
          officeId: officeId || '',
          dayOfWeek: dayName as DayOfWeek,
          startTime: range.startTime,
          endTime: range.endTime,
          isAvailable: true,
        }));
      });

      const createdAvailabilities =
        await officeDoctorAvailabilityService.createMany(availabilities);

      // Update context with the latest data
      setScheduleData(createdAvailabilities);

      // Navigate to next step
      router.push({
        pathname: '/onboarding/doctor/[doctorId]/specialization',
        params: { doctorId },
      });
    } catch (error) {
      console.error('Error saving schedule:', error);
      // TODO: Show error message to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <GestureHandlerRootView className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <AppScrollContainer keyboardShouldPersistTaps="handled">
            <AppTitle className="text-center mb-2">Horarios de atención</AppTitle>
            <AppSubtitle className="text-center mb-5">
              Selecciona los días y horarios en los que atenderás
            </AppSubtitle>

            <View className="flex-row justify-between mb-8">
              {Days.map(day => (
                <View key={day.id}>
                  <Pressable
                    onPress={() => handleDaySelection(day.id as DayId)}
                    className={`w-10 h-10 rounded-full justify-center items-center ${
                      selectedDays[day.id] ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        selectedDays[day.id] ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {day.id}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>

            {/* Secciones de horarios por día */}
            {Days.map(day => {
              if (!selectedDays[day.id as DayId]) return null;

              return (
                <View key={day.name} className="mb-8">
                  <AppParagraph className="font-bold">{day.name}</AppParagraph>

                  {schedules[day.name].map((range, index) => (
                    <View key={index} className="flex-row items-center mb-4">
                      {/* Selector de hora de inicio */}
                      <View className="flex-1">
                        <TimeSelector
                          value={range.startTime}
                          onSelect={value => updateSchedule(day.name, index, 'startTime', value)}
                        />
                      </View>

                      <AppParagraph className="mx-2">a</AppParagraph>

                      {/* Selector de hora de fin */}
                      <View className="flex-1">
                        <TimeSelector
                          value={range.endTime}
                          onSelect={value => updateSchedule(day.name, index, 'endTime', value)}
                        />
                      </View>

                      {/* Botones para agregar/eliminar rangos */}
                      <View className="flex-row ml-2">
                        <Pressable
                          onPress={() => {
                            const newSchedules = { ...schedules };
                            newSchedules[day.name].splice(index, 1);
                            setSchedules(newSchedules);
                          }}
                          className={`p-2 ${index === 0 ? 'opacity-0' : 'opacity-100'}`}
                        >
                          <Feather name="minus-circle" size={24} color="#ef4444" />
                        </Pressable>

                        <Pressable
                          onPress={() => handleAddScheduleRange(day.name)}
                          className={`p-2 ${
                            index === schedules[day.name].length - 1 ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <Feather name="plus-circle" size={24} color="#3b82f6" />
                        </Pressable>
                      </View>
                    </View>
                  ))}
                </View>
              );
            })}
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
    </AppLayout>
  );
};

export default OfficeScheduleScreen;
