import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

import { OnboardingProvider } from '@/src/providers/OnboardingContext';
import { getAppBackgroundColor, getHeaderTintColor } from '@/src/constants/colors';

const StackLayout = () => {
  const { colorScheme } = useColorScheme();

  const backgroundColor = getAppBackgroundColor(colorScheme);
  const headerTintColor = getHeaderTintColor(colorScheme);

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerBackTitle: 'Volver',
        headerStyle: {
          backgroundColor,
        },
        headerShadowVisible: false,
        headerTintColor,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <StackLayout />
    </OnboardingProvider>
  );
}
