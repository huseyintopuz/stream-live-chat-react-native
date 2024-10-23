import { RootStackParamList } from '@/types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SplashScreen'
>;
type SplashScreenProps = {
  navigation: SplashScreenNavigationProp;
};
const SplashScreen = ({ navigation }: SplashScreenProps) => {
  console.log('hello');

  useEffect(() => {
    const checkToken = async () => {
      console.log('check token');
      try {
        const userToSaveJSON = await EncryptedStorage.getItem('token');
        console.log({ userToSaveJSON });

        if (userToSaveJSON) {
          const userToSave = JSON.parse(userToSaveJSON);
          if (userToSave && userToSave.token) {
            navigation.replace('HomeScreen');
            console.log('home');
          } else {
            navigation.replace('AuthStackScreen');
          }
        } else {
          navigation.replace('AuthStackScreen');
          console.log('auth');
        }
      } catch (error) {
        console.error('Failed to retrieve token:', error);
        navigation.replace('AuthStackScreen');
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
