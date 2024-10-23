import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

type MeetingButtonProps = {
  title: string;
  onPress: () => void;
  children: React.ReactNode;
};
const MeetingButton = ({ title, onPress, children }: MeetingButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row justify-center items-center space-x-3 bg-[#3ee76b] h-14 mt-4 rounded-lg">
      {children}
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default MeetingButton;
