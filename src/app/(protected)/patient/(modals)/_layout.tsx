import { getAppBackgroundColor, getHeaderTintColor } from '@/src/constants/colors';
import { AppointmentProvider } from '@/src/providers/AppointmentContext';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function ModalLayout() {
  const { colorScheme } = useColorScheme();
  const backgroundColor = getAppBackgroundColor(colorScheme);
  const headerTintColor = getHeaderTintColor(colorScheme);

  return (
    <AppointmentProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor },
          headerBackTitle: 'Volver',
          headerTintColor,
        }}
      />
    </AppointmentProvider>
  );
}
