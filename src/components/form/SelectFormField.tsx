import { View, Text, Pressable, Modal, FlatList } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

interface SelectFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
  errorMessage?: string;
  options: { label: string; value: string }[];
  icon?: React.ReactNode;
}

const SelectFormField = <T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  className = '',
  errorMessage,
  options,
  icon,
}: SelectFormFieldProps<T>) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Controller
      control={control}
      rules={{
        required: required ? errorMessage || 'Este campo es obligatorio' : false,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className={`mb-4 ${className}`}>
          {label && <Text className="text-gray-700 dark:text-gray-300 mb-1">{label}</Text>}
          <Pressable
            onPress={() => setIsModalVisible(true)}
            className={`border rounded-lg p-3 ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 flex-row items-center`}
          >
            <Text className="text-gray-900 dark:text-white">
              {value ? options.find(opt => opt.value === value)?.label : 'Seleccionar...'}
            </Text>
            <View className="flex-1 items-end">
              {icon || <Feather name="chevron-down" size={24} color="gray" />}
            </View>
          </Pressable>
          {error && <Text className="text-red-500 text-sm mt-1">{error.message}</Text>}

          <Modal visible={isModalVisible} transparent animationType="slide">
            <Pressable
              onPress={() => setIsModalVisible(false)}
              className="flex-1 justify-end bg-black/50"
            >
              <View className="bg-white dark:bg-gray-800 rounded-t-xl p-4 max-h-[60%]">
                <Text className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  {label}
                </Text>
                <FlatList
                  data={options}
                  keyExtractor={item => item.value}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        onChange(item.value);
                        setIsModalVisible(false);
                      }}
                      className={`p-3 ${
                        value === item.value
                          ? 'bg-sky-100 dark:bg-sky-900'
                          : 'bg-white dark:bg-gray-800'
                      }`}
                    >
                      <Text
                        className={`${
                          value === item.value
                            ? 'text-sky-600 dark:text-sky-300'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  )}
                />
                <Pressable
                  onPress={() => setIsModalVisible(false)}
                  className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <Text className="text-center text-gray-900 dark:text-white">Cancelar</Text>
                </Pressable>
              </View>
            </Pressable>
          </Modal>
        </View>
      )}
      name={name}
    />
  );
};

export default SelectFormField;
