import { Text } from 'react-native';

interface AppHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const AppHeading = ({ children, className = '' }: AppHeadingProps) => (
  <Text className={`text-2xl font-bold mb-4 dark:text-white ${className}`}>{children}</Text>
);

export default AppHeading;
