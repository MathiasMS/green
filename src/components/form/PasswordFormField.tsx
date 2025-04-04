import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff } from 'react-native-feather';

interface PasswordFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  errorMessage?: string;
  validateRule?: (value: string) => string | undefined;
}

const PasswordFormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Contraseña',
  required = true,
  className = '',
  errorMessage = 'La contraseña es obligatoria',
  validateRule,
}: PasswordFormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      rules={{
        required: required ? errorMessage : false,
        minLength: {
          value: 6,
          message: 'La contraseña debe tener al menos 6 caracteres',
        },
        validate: validateRule,
      }}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className={`mb-4 ${className}`}>
          {label && <Text className="text-gray-700 dark:text-gray-300 mb-1">{label}</Text>}
          <View className="relative">
            <TextInput
              className={`border rounded-lg p-3 pr-20 ${
                error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              onBlur={onBlur}
              onChangeText={onChange}
              textContentType="oneTimeCode"
              value={value || ''}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
            />
            <TouchableOpacity
              className="absolute right-3 top-3"
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff color="#6B7280" /> : <Eye color="#6B7280" />}
            </TouchableOpacity>
          </View>
          {error && <Text className="text-red-500 text-sm mt-1">{error.message}</Text>}
        </View>
      )}
      name={name}
    />
  );
};

export default PasswordFormField;
