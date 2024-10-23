import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';
import { RootStackParamList } from '@/types/types';
import { useAuth } from '../context/auth';
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from '@stream-io/video-react-native-sdk';
import { STREAM_ACCESS_KEY } from '@env';
import CallScreen from '../screens/CallScreen';
// @screens hatasını düzelt
const Stack = createStackNavigator<RootStackParamList>();

const AuthStackScreen = () => {
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
  const { user } = useAuth() || {};
  const [client, setClient] = useState<StreamVideoClient | null>(null);

  useEffect(() => {
    if (user?.token && !client) {
      const userInfo: User = { id: user.user.id };
      try {
        const newClient = new StreamVideoClient({
          apiKey: STREAM_ACCESS_KEY,
          token: user.token,
          user: userInfo,
        });
        setClient(newClient);
      } catch (error) {
        console.error('Failed to initialize StreamVideoClient:', error);
      }
    }
  }, [user?.token]);

  if (!client) {
    // Eğer client yoksa SplashScreen ekranını göster
    return (
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthStackScreen"
          component={AuthStackScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <StreamVideo client={client}>
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
          name="AuthStackScreen"
          component={AuthStackScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CallScreen" component={CallScreen} />
      </Stack.Navigator>
    </StreamVideo>
  );
}
