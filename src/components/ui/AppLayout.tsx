import { View } from 'react-native';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AppLayout = ({ children, className = '' }: AppLayoutProps) => {
  return <View className={`flex-1 bg-white dark:bg-gray-900 ${className}`}>{children}</View>;
};

export default AppLayout;
