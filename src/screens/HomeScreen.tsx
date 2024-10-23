import {
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
  Alert,
  Modal,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types/types'; // Adjust the path as needed
import { useAuth } from '../context/auth';
import { useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import MeetingButton from '../components/buttons/MeetingButton';
import CamRecorderIcon from '../assets/icons/cam-recorder.svg';
import PeopleIcon from '../assets/icons/people.svg';
import MeetingRoomButton from '../components/buttons/MeetingRoomButton';
type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const client = useStreamVideoClient();
  const { signOut } = useAuth() || {};

  const [meetingId, setMeetingId] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSignOut = async () => {
    if (signOut) {
      await signOut();
      navigation.replace('AuthStackScreen');
      client?.disconnectUser();
    }
  };

  const onStartNewMeeting = () => {
    const randomId = Math.random().toString(36).substring(7);
    navigation.navigate('CallScreen', { callId: randomId });
  };

  const onJoinMeeting = () => {
    setModalVisible(true); // Open modal when button is pressed
  };

  const handleJoin = () => {
    if (meetingId) {
      setModalVisible(false); // Close modal
      navigation.navigate('CallScreen', { callId: meetingId });
    } else {
      Alert.alert('Error', 'Please enter a valid Meeting ID');
    }
  };

  return (
    <SafeAreaView className="flex-1">
      {/* behavior ı test et */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        contentContainerStyle={{ flexGrow: 1 }}
        className="p-4">
        <Text className="text-3xl text-red-600 text-center">HomeScreen</Text>
        <MeetingButton title="Start new Meeting" onPress={onStartNewMeeting}>
          <CamRecorderIcon width={20} height={20} />
        </MeetingButton>
        <MeetingButton title="Join Meeting" onPress={onJoinMeeting}>
          <PeopleIcon width={20} height={20} />
        </MeetingButton>
        <View className="flex-row items-center space-x-2 mt-4 ">
          <View className="flex-1 h-[1px] bg-slate-700" />
          <Text>or join public room</Text>
          <View className="flex-1 h-[1px] bg-slate-950" />
        </View>
        <MeetingRoomButton
          imagePath={require('../assets/images/react-native-image.png')}
          title="React Native Developers"
        />
        <MeetingRoomButton
          imagePath={require('../assets/images/front-end-image.jpeg')}
          title="Front-End Developers"
        />
        <Pressable onPress={handleSignOut} className="mt-4">
          <Text>Logout</Text>
        </Pressable>
        <Modal visible={isModalVisible} transparent={true} animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text>Enter Meeting ID:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Meeting ID"
                value={meetingId}
                onChangeText={setMeetingId}
              />
              <Button title="Join" onPress={handleJoin} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 5,
  },
});
