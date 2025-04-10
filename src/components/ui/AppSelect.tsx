import { View, Text, Pressable, Modal, FlatList } from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

export interface SelectItem {
  label: string;
  value: string;
}

interface AppSelectProps {
  items: SelectItem[];
  value: string;
  onValueChange: (item: SelectItem) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

const AppSelect = ({
  items,
  value,
  onValueChange,
  placeholder = 'Seleccionar...',
  icon,
}: AppSelectProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View className="mb-4">
      <Pressable
        onPress={() => setIsModalVisible(true)}
        className="border rounded-lg p-3 border-gray-300 bg-white flex-row items-center"
      >
        <Text className="text-gray-900">
          {value ? items.find(opt => opt.value === value)?.label : placeholder}
        </Text>
        <View className="flex-1 items-end">
          {icon || <Feather name="chevron-down" size={24} color="gray" />}
        </View>
      </Pressable>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <Pressable
          onPress={() => setIsModalVisible(false)}
          className="flex-1 justify-end bg-black/50"
        >
          <View className="bg-white rounded-t-xl p-4 max-h-[60%]">
            <FlatList
              data={items}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onValueChange(item);
                    setIsModalVisible(false);
                  }}
                  className="p-3"
                >
                  <Text className="text-gray-900">{item.label}</Text>
                </Pressable>
              )}
            />
            <Pressable
              onPress={() => setIsModalVisible(false)}
              className="mt-4 p-3 bg-gray-100 rounded-lg"
            >
              <Text className="text-center text-gray-900">Cancelar</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default AppSelect;
