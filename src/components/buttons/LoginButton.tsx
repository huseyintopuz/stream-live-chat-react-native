import { Text, Pressable, ActivityIndicator, View } from 'react-native';
import React from 'react';
import { LoginScreenProps } from '../../types/types';

const LoginButton: React.FC<LoginScreenProps> = props => {
  const { onPress, isSubmitting, text } = props;
  return (
    <Pressable
      className="flex-row justify-center items-center space-x-3 bg-[#614be9] h-14 rounded-lg"
      onPress={onPress}>
      {!isSubmitting && (
        <View>
          <Text className="text-white font-bold text-center">{text}</Text>
          <Text className="text-white text-center">
            Experience HD Video Call
          </Text>
        </View>
      )}
      {isSubmitting && <ActivityIndicator color="white" size="small" />}
    </Pressable>
  );
};

export default LoginButton;
