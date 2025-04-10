import { View, TouchableOpacity, Text } from 'react-native';
import { ArrowRight, MapPin, Star } from 'react-native-feather';
import { format } from 'date-fns';
import { getAppTextColor } from '@/src/constants/colors';
import { useColorScheme } from 'nativewind';
import { Doctor } from '@/src/contexts/appointment/domain/doctor/Doctor';
import { AppParagraph } from '@/src/components/ui';

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const { colorScheme } = useColorScheme();
  const textColor = getAppTextColor(colorScheme);

  const formatSpecializations = (specs: string) => {
    return specs
      .split(',')
      .map(s => s.trim())
      .join(' | ');
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-AR')}`;
  };

  // Format date to show only day/month
  const formatDate = (date: Date) => {
    return format(date, 'dd/MM');
  };

  return (
    <TouchableOpacity
      className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-4"
      onPress={() => {
        console.log('AZUCAR');
      }}
      activeOpacity={0.7}
    >
      {/* Doctor name and rating */}
      <View className="flex-row justify-between items-start mb-1">
        <AppParagraph className="text-black text-xl font-bold flex-1">
          {doctor.title} {doctor.lastName}, {doctor.firstName}
        </AppParagraph>
        {doctor.rating && (
          <View className="flex-row items-center">
            <Star width={16} height={16} fill="#FFB800" stroke="#FFB800" />
            <Text className="ml-1 text-black font-medium">{doctor.rating}</Text>
          </View>
        )}
      </View>

      {/* Specializations */}
      <AppParagraph className=" mb-2">{formatSpecializations(doctor.specializations)}</AppParagraph>

      <View
        className={`flex-row justify-between items-center ${
          doctor.firstConsultationFee > 0 ? 'visible' : 'invisible'
        }`}
      >
        <Text className="text-green-500 text-lg font-medium mb-4">
          {formatCurrency(doctor.firstConsultationFee)}
        </Text>
      </View>

      {/* Address */}
      <View className="flex-row items-start mb-4">
        <MapPin width={20} height={20} color={textColor} className="mt-1" />
        <AppParagraph className="text-gray-700 ml-2 flex-1">{doctor.fullAddress}</AppParagraph>
      </View>

      {/* Consultation types */}
      <View className="flex-row mb-6">
        {(doctor.consultationType === 'Virtual' || doctor.consultationType === 'Hibrida') && (
          <View className="bg-purple-500 rounded-full px-2 py-2 mr-2">
            <AppParagraph className="text-white font-semibold text-xs">
              Consulta virtual
            </AppParagraph>
          </View>
        )}
        {(doctor.consultationType === 'Presencial' || doctor.consultationType === 'Hibrida') && (
          <View className="bg-pink-500 rounded-full px-2 py-2">
            <AppParagraph className="text-white font-semibold text-xs">
              Consulta Presencial
            </AppParagraph>
          </View>
        )}
      </View>

      {/* Next available slot and agenda link */}
      <View className="flex-row justify-between items-center">
        <AppParagraph className="font-medium">
          Proximo turno {formatDate(doctor.nextAvailableSlot)}
        </AppParagraph>
        <View className="flex-row items-center">
          <Text className="text-[#4285F4] mr-1">Ver agenda</Text>
          <ArrowRight width={16} height={16} color="#4285F4" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorCard;
