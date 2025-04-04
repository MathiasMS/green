import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

import { OnboardingProvider } from '@/src/providers/OnboardingContext';
import { getAppBackgroundColor } from '@/src/constants/colors';

const StackLayout = () => {
  const { colorScheme } = useColorScheme();

  const backgroundColor = getAppBackgroundColor(colorScheme);

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerBackTitle: '',
        headerStyle: {
          backgroundColor,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" />
      {/* <Stack.Screen
        name="patient/index"
        options={{
          headerStyle: {
            // backgroundColor: theme['background-basic-color-1'],
          },
        }}
      />
      <Stack.Screen
        name="doctor/index"
        options={{
          headerStyle: {
            // backgroundColor: theme['background-basic-color-1'],
          },
        }}
      /> */}
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
