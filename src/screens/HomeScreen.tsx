import {
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types/types'; // Adjust the path as needed
import { useAuth } from '../context/auth';
import { StreamVideo } from '@stream-io/video-react-native-sdk';

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
  const { client, signOut } = useAuth() || {};

  const handleSignOut = async () => {
    if (signOut) {
      await signOut();
      navigation.replace('Auth');
      client?.disconnectUser();
    }
  };

  if (!client) {
    return (
      <SafeAreaView className="flex-1">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  return (
    <StreamVideo client={client}>
      <SafeAreaView className="flex-1">
        {/* behavior ı test et */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text className="text-3xl text-red-600 text-center">HomeScreen</Text>

          <Pressable onPress={handleSignOut}>
            <Text>Logout</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </StreamVideo>
  );
};

export default HomeScreen;
