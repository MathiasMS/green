import { TextInput, View, Text } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { AppParagraph } from '../ui';

interface NumericFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  secureTextEntry?: boolean;
  className?: string;
  errorMessage?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'numeric' | 'phone-pad';
  isTextArea?: boolean;
  infoMessage?: string;
}

const TextFormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  secureTextEntry = false,
  className = '',
  errorMessage,
  autoCapitalize = 'none',
  keyboardType = 'phone-pad',
  infoMessage,
}: NumericFormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      rules={{
        required: required ? errorMessage || 'Este campo es obligatorio' : false,
      }}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
        const handleChange = (text: string) => {
          const onlyNumbers = text.replace(/[^0-9]/g, '');

          onChange(onlyNumbers);
        };

        return (
          <View className={`mb-4 ${className}`}>
            {label && (
              <AppParagraph className="text-gray-700 dark:text-gray-300 mb-2">{label}</AppParagraph>
            )}
            <TextInput
              className={`border rounded-lg p-3 ${
                error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              onBlur={onBlur}
              onChangeText={handleChange}
              value={value || ''}
              secureTextEntry={secureTextEntry}
              autoCapitalize={autoCapitalize}
              keyboardType={keyboardType}
              autoComplete={secureTextEntry ? 'password' : 'off'}
            />
            {error ? (
              <Text className="text-red-500 text-sm mt-1">{error.message}</Text>
            ) : infoMessage ? (
              <Text className="text-gray-500 text-sm mt-1">{infoMessage}</Text>
            ) : null}
          </View>
        );
      }}
      name={name}
    />
  );
};

export default TextFormField;
