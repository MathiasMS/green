// import { ScrollView, View, Image, TouchableOpacity, Text, TextInput } from 'react-native';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { AppButton, AppLayout } from '@/src/components/ui';

const DefaultScreen = () => {
  const router = useRouter();

  return (
    <AppLayout>
      <ScrollView className="flex-1" contentContainerClassName="flex-1 items-center justify-center">
        <Image
          source={require('@/assets/images/react-logo.png')}
          className="w-[200px] h-[200px] mb-10"
        />
        <View className="w-4/5 max-w-[300px] gap-5">
          <AppButton
            onPress={() => router.push('/login')}
            title="Inicia sesion"
            variant="primary"
          />
          <AppButton
            onPress={() => router.push('/sign-up')}
            title="Crear cuenta"
            variant="primary"
          />
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default DefaultScreen;
