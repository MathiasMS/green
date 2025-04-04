import { Text } from 'react-native';

interface AppTitleProps {
  children: React.ReactNode;
  className?: string;
}

const AppTitle = ({ children, className }: AppTitleProps) => {
  return <Text className={`text-3xl font-bold mb-5 dark:text-white ${className}`}>{children}</Text>;
};

export default AppTitle;
