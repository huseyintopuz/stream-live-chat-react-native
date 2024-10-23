import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/types';
import {
  Call,
  CallContent,
  CallingState,
  StreamCall,
  useStreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import ParticipantCountText from '../components/ParticipantCountText';

type Props = StackScreenProps<RootStackParamList, 'CallScreen'>;

const CallScreen = ({ route, navigation }: Props) => {
  const { callId } = route.params;
  const [call, setCall] = React.useState<Call | null>(null);
  console.log(callId);

  const client = useStreamVideoClient();

  console.log({ call });

  useEffect(() => {
    const _call = client?.call('default', callId);
    _call?.join({ create: true }).then(() => setCall(_call));
  }, [client, callId]);

  useEffect(() => {
    return () => {
      // cleanup the call on unmount if the call was not left already
      if (call?.state.callingState !== CallingState.LEFT) {
        call?.leave();
      }
    };
  }, [call]);

  if (!call) {
    return (
      <View>
        <Text>Joining call...</Text>
      </View>
    );
  }

  return (
    <StreamCall call={call}>
      <View className="flex-1">
        <Text>{callId}</Text>
        <ParticipantCountText />
        <CallContent onHangupCallHandler={() => navigation.goBack()} />
      </View>
    </StreamCall>
  );
};

export default CallScreen;
