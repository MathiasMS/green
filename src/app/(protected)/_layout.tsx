import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: '',
      }}
    />
  );
}

{
  /* <Stack.Screen
  name="onboarding"
  options={{
    headerTitle: '',
    headerShown: false,
  }}
/>
<Stack.Screen
  name="home/index"
  options={{
    headerTitle: '',
    headerShown: false,
  }}
/>
</Stack> */
}
