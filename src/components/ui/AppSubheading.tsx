import { Text } from 'react-native';

interface AppSubheadingProps {
  children: React.ReactNode;
  className?: string;
}

const AppSubheading = ({ children, className = '' }: AppSubheadingProps) => (
  <Text className={`text-xl font-semibold mb-3 dark:text-white ${className}`}>{children}</Text>
);

export default AppSubheading;
