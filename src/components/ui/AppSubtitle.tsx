import { Text } from 'react-native';

interface AppSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

const AppSubtitle = ({ children, className = '' }: AppSubtitleProps) => (
  <Text className={`text-sm font-medium text-gray-600 dark:text-gray-400 ${className}`}>
    {children}
  </Text>
);

export default AppSubtitle;
