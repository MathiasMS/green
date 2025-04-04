import { TextInput, View, Text } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface TextFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  secureTextEntry?: boolean;
  className?: string;
  errorMessage?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
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
  keyboardType = 'default',
  isTextArea = false,
  infoMessage,
}: TextFormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      rules={{
        required: required ? errorMessage || 'Este campo es obligatorio' : false,
      }}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className={`mb-4 ${className}`}>
          {label && <Text className="text-gray-700 dark:text-gray-300 mb-2">{label}</Text>}
          <TextInput
            className={`border rounded-lg p-3 ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
              isTextArea ? 'min-h-[100px]' : ''
            }`}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            onBlur={onBlur}
            multiline={isTextArea}
            numberOfLines={isTextArea ? 5 : undefined}
            onChangeText={onChange}
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
      )}
      name={name}
    />
  );
};

export default TextFormField;
