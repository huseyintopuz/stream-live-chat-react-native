import React, { useEffect } from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';
import { RootStackParamList } from '@/types/types';
import { useAuth } from '../context/auth';
import { StreamVideoClient, User } from '@stream-io/video-react-native-sdk';
import { STREAM_ACCESS_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';
import RoomScreen from '../screens/RoomScreen';
// @screens hatasını düzelt
const Stack = createStackNavigator<RootStackParamList>();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function Root() {
  const { user, client, setClient } = useAuth() || {};
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (user?.token && !client) {
      const userInfo: User = { id: user.user.id };
      try {
        const newClient = new StreamVideoClient({
          apiKey: STREAM_ACCESS_KEY,
          token: user.token,
          user: userInfo,
        });
        if (setClient) {
          setClient(newClient);
        } else {
          console.error('setClient function is undefined');
        }
      } catch (error) {
        console.error('Failed to initialize StreamVideoClient:', error);
      }
    }
  }, [user?.token]);

  useEffect(() => {
    if (user?.token && client) {
      navigation.navigate('HomeScreen');
    } else {
      navigation.navigate('Auth');
    }
  }, [user?.token, client]);

  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="RoomScreen" component={RoomScreen} />
    </Stack.Navigator>
  );
}
