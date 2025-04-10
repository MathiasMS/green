//Implmenta un calendario hecho a mano, no usa react-native-ui-datepicker

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Animated,
  Pressable,
} from 'react-native';
import {
  Calendar,
  Filter,
  Lock,
  Plus,
  Users,
  AtSign,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'react-native-feather';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useAuth } from '@/src/hooks/useAuth';

// Sample appointment data with dates
const SAMPLE_APPOINTMENTS = [
  {
    id: '1',
    date: '2025-04-05', // Saturday
    time: '09:00',
    duration: 10,
    status: 'Reservado',
    patientName: 'medina, mathias',
    specialization: 'Medicina Cannabica / Consulta',
    location: 'asd, asd',
    type: 'Particular',
    isVirtual: false,
  },
  {
    id: '2',
    date: '2025-04-07', // Monday
    time: '10:30',
    duration: 30,
    status: 'Reservado',
    patientName: 'rodriguez, ana',
    specialization: 'Medicina General / Consulta',
    location: 'Consultorio 3, Piso 2',
    type: 'Virtual',
    isVirtual: true,
  },
  {
    id: '3',
    date: '2025-04-03', // Thursday
    time: '12:00',
    duration: 15,
    status: 'Cancelado',
    patientName: 'gomez, carlos',
    specialization: 'Medicina Cannabica / Seguimiento',
    location: 'Consultorio 1, Piso 1',
    type: 'Particular',
    isVirtual: false,
  },
  {
    id: '4',
    date: '2025-04-08', // Tuesday
    time: '14:00',
    duration: 20,
    status: 'Reservado',
    patientName: 'perez, juan',
    specialization: 'Medicina Cannabica / Consulta',
    location: 'Consultorio 2, Piso 1',
    type: 'Particular',
    isVirtual: false,
  },
  {
    id: '5',
    date: '2025-04-10', // Thursday
    time: '16:30',
    duration: 45,
    status: 'Reservado',
    patientName: 'martinez, lucia',
    specialization: 'Medicina General / Consulta',
    location: 'Consultorio 1, Piso 2',
    type: 'Virtual',
    isVirtual: true,
  },
  {
    id: '6',
    date: '2025-04-14', // Monday
    time: '11:15',
    duration: 30,
    status: 'Reservado',
    patientName: 'sanchez, roberto',
    specialization: 'Medicina Cannabica / Seguimiento',
    location: 'Consultorio 3, Piso 1',
    type: 'Particular',
    isVirtual: false,
  },
  {
    id: '7',
    date: '2025-04-21', // Monday
    time: '09:45',
    duration: 15,
    status: 'Reservado',
    patientName: 'lopez, maria',
    specialization: 'Medicina General / Consulta',
    location: 'Consultorio 2, Piso 2',
    type: 'Particular',
    isVirtual: false,
  },
  {
    id: '8',
    date: '2025-04-28', // Monday
    time: '13:30',
    duration: 20,
    status: 'Reservado',
    patientName: 'diaz, fernando',
    specialization: 'Medicina Cannabica / Consulta',
    location: 'Consultorio 1, Piso 1',
    type: 'Virtual',
    isVirtual: true,
  },
];

const AppointmentsScreen = () => {
  const { signOut } = useAuth();
  const [selectedDate, setSelectedDate] = useState(dayjs('2025-04-05')); // Set to match the screenshot
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [calendarHeight] = useState(new Animated.Value(0));
  const [currentMonth, setCurrentMonth] = useState(dayjs('2025-04-01'));
  const [appointments, setAppointments] = useState(SAMPLE_APPOINTMENTS);

  // Get appointments for the selected date
  const filteredAppointments = appointments.filter(
    appointment => appointment.date === selectedDate.format('YYYY-MM-DD')
  );

  // Get dates with appointments for the current month
  const datesWithAppointments = appointments
    .filter(appointment => dayjs(appointment.date).month() === currentMonth.month())
    .map(appointment => dayjs(appointment.date).date());

  const formattedDate = () => {
    // Format date as "Sábado 5 de Abr"
    return selectedDate.locale('es').format('dddd D [de] MMM');
  };

  const toggleCalendar = () => {
    const toValue = isCalendarVisible ? 0 : 380; // Height of the calendar
    Animated.timing(calendarHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsCalendarVisible(!isCalendarVisible);
  };

  const navigateMonth = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentMonth(currentMonth.add(1, 'month'));
    } else {
      setCurrentMonth(currentMonth.subtract(1, 'month'));
    }
  };

  const renderCalendar = () => {
    const daysInMonth = currentMonth.daysInMonth();
    const firstDayOfMonth = currentMonth.startOf('month').day(); // 0 is Sunday
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust for Monday start (0 = Monday)

    // Create weeks array
    const weeks = [];
    let days = [];

    // Add day names row
    const dayNames = ['Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab', 'Dom'];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<View key={`empty-${i}`} className="items-center justify-center flex-1" />);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = currentMonth.date(i);
      const isSelected = date.format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD');
      const hasAppointment = datesWithAppointments.includes(i);

      days.push(
        <TouchableOpacity
          key={`day-${i}`}
          className="items-center justify-center flex-1 py-2"
          onPress={() => setSelectedDate(date)}
        >
          <View
            className={`w-10 h-10 rounded-full items-center justify-center ${isSelected ? 'bg-blue-500' : ''}`}
          >
            <Text className={`text-lg ${isSelected ? 'text-white' : 'text-black'}`}>{i}</Text>
          </View>
          {hasAppointment && (
            <View
              className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-blue-500'}`}
            />
          )}
        </TouchableOpacity>
      );

      // If we've reached the end of a week or the end of the month, start a new row
      if ((adjustedFirstDay + i) % 7 === 0 || i === daysInMonth) {
        weeks.push(
          <View key={`week-${weeks.length}`} className="flex-row">
            {days}
          </View>
        );
        days = [];
      }
    }

    return (
      <View className="px-4 py-2">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => navigateMonth('prev')}>
            <ChevronLeft width={24} height={24} color="#4169E1" />
          </TouchableOpacity>

          <Text className="text-xl font-medium">
            {currentMonth.locale('es').format('MMMM YYYY')}
          </Text>

          <TouchableOpacity onPress={() => navigateMonth('next')}>
            <ChevronRight width={24} height={24} color="#4169E1" />
          </TouchableOpacity>
        </View>

        {/* Day names row */}
        <View className="flex-row mb-2">
          {dayNames.map((name, index) => (
            <View key={`header-${index}`} className="items-center justify-center flex-1">
              <Text className="text-gray-400 text-sm">{name}</Text>
            </View>
          ))}
        </View>

        {/* Calendar weeks */}
        {weeks}
      </View>
    );
  };

  const renderAppointmentItem = ({ item }: { item: any }) => (
    <View className="flex-row border-b border-gray-100 py-4">
      <View className="w-24 items-start justify-start">
        <Text className="text-2xl font-bold">{item.time}</Text>
        <Text className="text-gray-500">{item.duration} min</Text>
        <View
          className={`mt-1 px-2 py-1 rounded-md ${item.status === 'Reservado' ? 'bg-green-600' : 'bg-red-500'}`}
        >
          <Text className="text-white text-xs">{item.status}</Text>
        </View>
      </View>

      <View className="flex-1 ml-4">
        <Text className="text-blue-500 text-lg font-medium">{item.patientName}</Text>
        <Text className="text-gray-800">{item.specialization}</Text>
        <Text className="text-gray-600">{item.location}</Text>
        <View className="flex-row mt-1">
          <Text className="text-gray-700">{item.type}</Text>
          {item.isVirtual && <Text className="ml-2 text-blue-600">• Virtual</Text>}
          {!item.isVirtual && <Text className="ml-2 text-green-600">• Presencial</Text>}
        </View>
      </View>
    </View>
  );

  const renderEmptyAppointments = () => (
    <View className="items-center justify-center py-10">
      <Text className="text-gray-500 text-lg">No hay citas para este día</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <TouchableOpacity className="w-12 h-12 items-center justify-center rounded-full border border-gray-300">
          <Filter width={20} height={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity className="w-12 h-12 items-center justify-center">
          <View className="relative">
            <Calendar width={24} height={24} color="#000" />
            <View className="absolute bottom-0 right-0">
              <Lock width={12} height={12} color="#000" />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center" onPress={toggleCalendar}>
          <Text className="text-lg font-medium mr-1">{formattedDate()}</Text>
          <View className="mt-1">
            <Text>{isCalendarVisible ? '▲' : '▼'}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="w-12 h-12 items-center justify-center">
          <Calendar width={24} height={24} color="#4169E1" />
        </TouchableOpacity>
      </View>

      {/* Expandable Calendar */}
      <Animated.View
        style={{ height: calendarHeight, overflow: 'hidden' }}
        className="border-b border-gray-200"
      >
        {renderCalendar()}
      </Animated.View>

      {/* Appointments List */}
      {filteredAppointments.length > 0 ? (
        <>
          <FlatList
            data={filteredAppointments}
            renderItem={renderAppointmentItem}
            keyExtractor={item => item.id}
            contentContainerClassName="px-4"
          />
          <Pressable onPress={signOut}>
            <Text>Cerrar sesión</Text>
          </Pressable>
        </>
      ) : (
        renderEmptyAppointments()
      )}

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-24 right-6 w-16 h-16 rounded-full bg-blue-500 items-center justify-center shadow-lg">
        <Plus width={24} height={24} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Tab Navigation */}
      <View className="flex-row items-center justify-around py-3 border-t border-gray-200 bg-white">
        <TouchableOpacity className="items-center w-1/4">
          <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center">
            <Calendar width={24} height={24} color="#4169E1" />
          </View>
          <Text className="text-xs mt-1">Agenda</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center w-1/4">
          <Users width={24} height={24} color="#666" />
          <Text className="text-xs mt-1">Pacientes</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center w-1/4">
          <AtSign width={24} height={24} color="#666" />
          <Text className="text-xs mt-1">Profesionales</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center w-1/4">
          <Settings width={24} height={24} color="#666" />
          <Text className="text-xs mt-1">Mi cuenta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AppointmentsScreen;
