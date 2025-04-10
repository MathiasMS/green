import { Text } from 'react-native';

interface AppParagraphProps {
  children: React.ReactNode;
  className?: string;
}

const AppParagraph = ({ children, className = '' }: AppParagraphProps) => (
  <Text className={`text-base dark:text-gray-200 ${className}`}>{children}</Text>
);

export default AppParagraph;
