import { Pressable, Text } from 'react-native';

interface AppButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary';
  appearance?: 'filled' | 'outline' | 'ghost';
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const AppButton = ({
  onPress,
  title,
  variant = 'primary',
  appearance = 'filled',
  className = '',
  loading = false,
  disabled = false,
}: AppButtonProps) => {
  const variants = {
    primary: {
      filled: 'bg-sky-500 hover:bg-sky-600 text-white',
      outline: 'border-2 border-sky-500 text-sky-500 hover:bg-sky-50',
      ghost: 'text-sky-500 hover:bg-sky-50',
    },
    secondary: {
      filled: 'bg-green-500 hover:bg-green-600 text-white',
      outline: 'border-2 border-green-500 text-green-500 hover:bg-green-50',
      ghost: 'text-green-500 hover:bg-green-50',
    },
  };

  const buttonStyle = variants[variant][appearance];

  const isDisabled = loading || disabled;

  const finalButtonStyle = isDisabled ? 'bg-gray-300' : buttonStyle;

  const style = `${finalButtonStyle} py-3 px-4 rounded-lg ${className}`;

  const textColors = {
    filled: 'text-white',
    outline: variant === 'primary' ? 'text-sky-500' : 'text-sky-green-500',
    ghost: variant === 'primary' ? 'text-sky-500' : 'text-green-500',
  };

  return (
    <Pressable onPress={onPress} className={style} disabled={isDisabled}>
      <Text className={`${textColors[appearance]} text-center font-semibold`}>{title}</Text>
    </Pressable>
  );
};
export default AppButton;
