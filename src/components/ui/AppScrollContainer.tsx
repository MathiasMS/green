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
      className={`flex-1 p-5 bg-white dark:bg-gray-900 ${className}`}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      keyboardDismissMode="on-drag"
    >
      {children}
    </ScrollView>
  );
};

export default AppScrollContainer;
