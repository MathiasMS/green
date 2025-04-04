import { getAppBackgroundColor, getAppTextColor } from '@/src/constants/colors';
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
  const textColor = getAppTextColor(colorScheme);

  console.log('Auth Layout - No session, showing auth screens');
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerTitle: '',
          headerTintColor: textColor,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerTitle: '',
          headerShadowVisible: false,
          headerTintColor: textColor,
          headerStyle: {
            backgroundColor: backgroundColor,
          },
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerTitle: '',
          headerShadowVisible: false,
          headerTintColor: textColor,
          headerStyle: {
            backgroundColor: backgroundColor,
          },
        }}
      />
    </Stack>
  );
}
