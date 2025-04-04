import { View, Text, Pressable, Modal } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useState } from 'react';
import DatePicker from 'react-native-ui-datepicker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Feather } from '@expo/vector-icons';

interface DatepickerFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
  errorMessage?: string;
  maximumDate?: Date;
  minimumDate?: Date;
  icon?: React.ReactNode;
}

const DatepickerFormField = <T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  className = '',
  errorMessage,
  maximumDate,
  minimumDate,
  icon,
}: DatepickerFormFieldProps<T>) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
            onPress={() => setDatePickerVisibility(true)}
            className={`border rounded-lg p-3 ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-800 flex-row items-center`}
          >
            <Text className="text-gray-900 dark:text-white">
              {value
                ? format(new Date(value), "dd 'de' MMMM 'de' yyyy", { locale: es })
                : 'Seleccionar fecha...'}
            </Text>
            <View className="flex-1 items-end">
              {icon || <Feather name="chevron-down" size={24} color="gray" />}
            </View>
          </Pressable>
          {error && <Text className="text-red-500 text-sm mt-1">{error.message}</Text>}

          <Modal visible={isDatePickerVisible} transparent animationType="slide">
            <Pressable
              onPress={() => setDatePickerVisibility(false)}
              className="flex-1 justify-end bg-black/50"
            >
              <View className="bg-white dark:bg-gray-800 rounded-t-xl p-4 max-h-[60%]">
                <DatePicker
                  classNames={{
                    day_label: 'dark:text-white',
                    month_label: 'dark:text-white',
                    year_label: 'dark:text-white',
                    month_selector_label: 'dark:text-white',
                    year_selector_label: 'dark:text-white',
                    time_selector_label: 'dark:text-white',
                    weekday_label: 'dark:text-white',
                    time_label: 'dark:text-white',

                    range_end_label: 'dark:text-white',
                    range_middle_label: 'dark:text-white',
                    range_start_label: 'dark:text-white',
                    selected_label: 'dark:text-white',

                    disabled_label: 'dark:text-white',

                    outside_label: 'dark:text-white',
                    today_label: 'dark:text-white',

                    selected_month_label: 'dark:text-white',

                    selected_year_label: 'dark:text-white',
                    active_year_label: 'dark:text-white',
                  }}
                  date={value ? new Date(value) : new Date()}
                  onChange={({ date }) => {
                    onChange(date);
                    setDatePickerVisibility(false);
                  }}
                  mode="single"
                  locale="es"
                />
                <Pressable
                  onPress={() => setDatePickerVisibility(false)}
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

export default DatepickerFormField;
