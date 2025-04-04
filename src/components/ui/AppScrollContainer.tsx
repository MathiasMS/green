import { ScrollView } from 'react-native';

const AppScrollContainer = ({
  children,
  className,
  keyboardShouldPersistTaps,
}: {
  children: React.ReactNode;
  className?: string;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
}) => {
  return (
    <ScrollView
      className={`flex-1 p-5 bg-white dark:bg-gray-800 ${className}`}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
    >
      {children}
    </ScrollView>
  );
};

export default AppScrollContainer;
