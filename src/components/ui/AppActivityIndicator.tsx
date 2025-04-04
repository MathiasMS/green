import { View, ActivityIndicator } from 'react-native';

const AppActivityIndicator = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
    </View>
  );
};

export default AppActivityIndicator;
