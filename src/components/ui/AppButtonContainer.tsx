import { Platform, View } from 'react-native';

interface AppButtonContainerProps {
  children: React.ReactNode;
  className?: string;
}

const AppButtonContainer = ({ children, className }: AppButtonContainerProps) => {
  const paddingBottom = Platform.OS === 'ios' ? 'pb-10' : 'pb-5';

  return (
    <View
      className={`flex-row p-5 ${paddingBottom} bg-transparent border-t border-gray-200 ${className}`}
    >
      {children}
    </View>
  );
};

export default AppButtonContainer;
