import {
  Text,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
} from 'react-native';
import React from 'react';

type MeetingRoomButtonProps = {
  imagePath: ImageSourcePropType;
  title: string;
};

const MeetingRoomButton = ({ imagePath, title }: MeetingRoomButtonProps) => {
  return (
    <Pressable>
      <ImageBackground
        resizeMode="stretch"
        source={imagePath}
        className="w-full h-40 mt-4 rounded-xl justify-center items-center overflow-hidden">
        <Text className="text-white font-bold text-2xl">{title}</Text>
      </ImageBackground>
    </Pressable>
  );
};

export default MeetingRoomButton;
