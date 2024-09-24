import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { CustomBottomAlertProps } from '../../types/types';

const CustomBottomAlert: React.FC<CustomBottomAlertProps> = ({
  visible,
  message,
  onClose,
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View className="flex-1 items-center justify-end mb-2.5">
        <View className="w-4/5 bg-white border border-[#ccc] rounded-lg p-3.5 mb-5">
          <Text>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="mt-2.5 text-blue-500 text-right">Tamam</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomBottomAlert;
