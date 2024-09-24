import { RootStackParamList } from '@/types/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SplashScreen'
>;
type SplashScreenRouteProp = RouteProp<RootStackParamList, 'SplashScreen'>;

type SplashScreenProps = {
  navigation: SplashScreenNavigationProp;
  route: SplashScreenRouteProp;
};
const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const userToSaveJSON = await EncryptedStorage.getItem('token');
        if (userToSaveJSON) {
          const userToSave = JSON.parse(userToSaveJSON);
          if (userToSave && userToSave.token) {
            navigation.replace('HomeScreen');
          } else {
            navigation.replace('Auth');
          }
        } else {
          navigation.replace('Auth');
        }
      } catch (error) {
        console.error('Failed to retrieve token:', error);
        navigation.replace('Auth');
      }
    };

    checkToken();
  }, []);

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
