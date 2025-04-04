import { TextInput, View, Text } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface EmailFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const EmailFormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Correo electrónico',
  required = true,
  className = '',
}: EmailFormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      rules={{
        required: required ? 'El correo electrónico es obligatorio' : false,
        pattern: {
          value: /^\S+@\S+$/i,
          message: 'Correo electrónico inválido',
        },
      }}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className={`mb-4 ${className}`}>
          {label && <Text className="text-gray-700 dark:text-gray-300 mb-1">{label}</Text>}
          <TextInput
            value={value || ''}
            className={`border rounded-lg p-3 ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            onBlur={onBlur}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          {error && <Text className="text-red-500 text-sm mt-1">{error.message}</Text>}
        </View>
      )}
      name={name}
    />
  );
};

export default EmailFormField;
