import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { useAuth } from '@/src/hooks/useAuth';
import {
  AppHeading,
  AppParagraph,
  AppSubheading,
  AppSubtitle,
  AppLayout,
  AppButton,
  Divider,
} from '@/src/components/ui';

export default function CreateProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSelectUserType = (userType: 'patient' | 'doctor') => {
    router.push(`/onboarding/${userType}`);
  };

  const test = () => {
    router.push({
      pathname: '/onboarding/doctor/[doctorId]/specialization',
      params: { doctorId: 'f18e66b6-4255-4546-8b28-6aca1e402095' },
    });
  };

  return (
    <AppLayout className="p-5 gap-5">
      <View className="gap-2 mb-5">
        <AppHeading>¿Qué necesitas realizar?</AppHeading>
        <AppParagraph>Selecciona una de las siguientes opciones para avanzar.</AppParagraph>
      </View>

      <View className="g-5">
        <View className="g-5">
          <View className="g-2 mb-2">
            <AppSubheading>Soy Paciente</AppSubheading>
            <AppSubtitle>Quiero reservar un turno con un profesional</AppSubtitle>
          </View>
          <AppButton onPress={() => handleSelectUserType('patient')} title="Reservar un turno" />
        </View>

        <Divider />

        <View className="g-5 mb-5">
          <View className="g-2 mb-2">
            <AppSubheading>Soy un profesional</AppSubheading>
            <AppSubtitle>Quiero registrar una nueva cuenta para gestionar mis turnos</AppSubtitle>
          </View>
          {/* <AppButton onPress={() => handleSelectUserType('doctor')} title="Registrar mi cuenta" /> */}
          <AppButton onPress={() => test()} title="Test" />
        </View>

        <View className="items-center">
          <View className="w-auto">
            <AppButton appearance="ghost" onPress={() => signOut()} title="Cerrar sesión" />
          </View>
        </View>
      </View>
    </AppLayout>
  );
}
