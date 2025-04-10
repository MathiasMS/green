import { View } from 'react-native';
import { AppButton, AppHeading } from '@/src/components/ui';
import { AppLayout } from '@/src/components/ui';
import { useAuth } from '@/src/hooks/useAuth';
import { AppointmentProvider } from '@/src/providers/AppointmentContext';
import { useRouter } from 'expo-router';

const PatientScreen = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <AppointmentProvider>
      <AppLayout>
        <View className="flex-1 p-4">
          <AppHeading className="text-2xl mb-6">Paciente</AppHeading>
          <AppButton
            title="Agendar turno"
            onPress={() => router.push('/(protected)/patient/(modals)')}
            className="mb-4"
          />
          {/* <Link href="/(protected)/patient/(modals)">Open modal</Link> */}
          <AppButton title="Cerrar sesión" onPress={() => signOut()} variant="secondary" />
        </View>
      </AppLayout>
    </AppointmentProvider>
  );
};

export default PatientScreen;
