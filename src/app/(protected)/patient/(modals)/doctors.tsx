import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { Sliders } from 'react-native-feather';

import { Doctor } from '@/src/contexts/appointment/domain/doctor/Doctor';
import { doctorService } from '@/src/contexts/appointment/container';
import { useAppointment } from '@/src/providers/AppointmentContext';
import {
  AppActivityIndicator,
  AppLayout,
  AppParagraph,
  AppScrollContainer,
} from '@/src/components/ui';

import SearchModal from './components/SearchModal';
import DoctorCard from './components/DoctorCard';

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const { specialization, location } = useAppointment();

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const fetchedDoctors = await doctorService.getAll({
        specializationId: specialization?.id || '',
        state: location,
      });

      setDoctors(fetchedDoctors);
    } catch (err) {
      setDoctors([]);
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const onUpdate = () => {
    setModalVisible(false);
    fetchDoctors();
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <AppLayout>
      <AppScrollContainer>
        <View className="mb-4">
          <View className="flex-row flex-1 justify-between items-center bg-gray-100 rounded-xl p-4">
            <Text className="text-gray-700 text-lg font-medium">
              {specialization?.name} - {location}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Sliders width={24} height={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <View className="flex-1 justify-center items-center p-4">
            <AppActivityIndicator />
          </View>
        ) : doctors.length === 0 ? (
          <View className="flex-1 justify-center items-center p-4">
            <AppParagraph className="text-gray-500 text-center">
              No se encontraron doctores disponibles.
            </AppParagraph>
          </View>
        ) : (
          doctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)
        )}
        <SearchModal visible={modalVisible} onClose={handleClose} onUpdate={onUpdate} />
      </AppScrollContainer>
    </AppLayout>
  );
};

export default Doctors;
