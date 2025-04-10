import { useEffect } from 'react';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from '../providers/AuthContext';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import 'react-native-reanimated';
import '@/global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const insets = useSafeAreaInsets();

  console.log(insets);
  return (
    <AuthProvider>
      <StatusBar hidden />
      {/* <SafeAreaView style={{ flex: 0, backgroundColor: 'red' }} /> */}

      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={['top']}>
        <Stack>
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </AuthProvider>
  );
}
