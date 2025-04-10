import { getAppBackgroundColor, getHeaderTintColor } from '@/src/constants/colors';
import { Redirect, Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useAuth } from '../../hooks/useAuth';

export default function Layout() {
  const { colorScheme } = useColorScheme();

  const {
    authState: { session },
  } = useAuth();

  if (session) {
    return <Redirect href="/(protected)" />;
  }

  const backgroundColor = getAppBackgroundColor(colorScheme);
  const headerTintColor = getHeaderTintColor(colorScheme);

  console.log('Auth Layout - No session, showing auth screens');
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: '',
        headerBackTitle: 'Volver',
        headerTintColor,
        headerStyle: {
          backgroundColor,
        },
      }}
    />
  );
}
