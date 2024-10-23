import { Text } from 'react-native';
import React from 'react';
import { useCallStateHooks } from '@stream-io/video-react-native-sdk';

const ParticipantCountText = () => {
  const { useParticipantCount } = useCallStateHooks();
  const participantCount = useParticipantCount();

  return <Text>{participantCount}</Text>;
};

export default ParticipantCountText;
