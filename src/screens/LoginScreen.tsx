import {
  View,
  TextInput,
  Platform,
  SafeAreaView,
  Button,
  Text,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import UserIcon from '../assets/icons/user.svg';
import PasswordIcon from '../assets/icons/padlock.svg';
import { useAuth } from '../context/auth';
import { handleSignIn } from '../api/api';
import CustomBottomAlert from '../components/alerts/CustomBottomAlert';
import LoginButton from '../components/buttons/LoginButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/types';

type Props = StackScreenProps<RootStackParamList, 'LoginScreen'>;

const LoginScreen = ({ route, navigation }: Props) => {
  const { successMessage } = route.params || {};
  const { signIn } = useAuth() || {};
  const userRef = useRef(null);

  const [bottomAlertVisible, setBottomAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginPage = useCallback(async () => {
    const fields = [
      { field: email, message: 'Kullanıcı adını giriniz' },
      { field: password, message: 'Şifrenizi giriniz' },
    ];

    for (const field of fields) {
      if (!field.field) {
        setAlertMessage(field.message);
        setBottomAlertVisible(true);
        return;
      }
    }
    await handleSignIn({
      email,
      password,
      setAlertMessage,
      setBottomAlertVisible,
      signIn,
      navigation,
      setIsSubmitting,
    });
  }, [
    email,
    password,
    signIn,
    setBottomAlertVisible,
    setAlertMessage,
    navigation,
  ]);

  const padding = Platform.OS === 'ios' ? 'py-5' : '';
  const onClose = () => {
    setBottomAlertVisible(false);
    setAlertMessage('');
  };

  const navigateToRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  useEffect(() => {
    setBottomAlertVisible(successMessage ? true : false);
    if (successMessage) {
      setAlertMessage(successMessage);
    }
  }, [successMessage]);

  return (
    <View className="flex-1 bg-[#d0e2ee] justify-center space-y-10 px-10">
      <View className="space-y-4">
        <Text className="text-3xl text-black font-semibold">Sign In</Text>
        <Text className="text-gray-500 w-60">
          Login to your existing account by entering your details
        </Text>
      </View>
      <View className="justify-center items-center">
        <View className="w-full bg-white border-[#EFEFEF] border rounded-2xl p-6 space-y-4">
          <View
            className={` ${
              isFocusedEmail ? 'bg-white' : 'bg-[#dfecf4]'
            } flex-row items-center border border-gray-300 shadow pl-2 rounded-lg space-x-2`}>
            <UserIcon width={20} height={20} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              className={`${padding} text-black w-5/6`}
              placeholderTextColor="gray"
              onFocus={() => setIsFocusedEmail(true)}
              onBlur={() => setIsFocusedEmail(false)}
              ref={userRef}
            />
          </View>
          {/*  */}
          <View
            className={` ${
              isFocusedPassword ? 'bg-white' : 'bg-[#dfecf4]'
            } flex-row items-center  border border-gray-300 shadow pl-2 rounded-lg space-x-2`}>
            <PasswordIcon width={20} height={20} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Şifre"
              className={`${padding} text-black w-5/6`}
              secureTextEntry={true}
              placeholderTextColor="gray"
              onFocus={() => setIsFocusedPassword(true)}
              onBlur={() => setIsFocusedPassword(false)}
            />
          </View>
          <View>
            <LoginButton
              isSubmitting={isSubmitting}
              onPress={handleLoginPage}
              text="Sign In"
            />
          </View>
          {/* <View>
            <Button onPress={navigateToRegister} title="Register" />
          </View> */}
          <CustomBottomAlert
            visible={bottomAlertVisible}
            message={alertMessage}
            onClose={onClose}
          />
        </View>
      </View>
      <View className="flex-row items-center space-x-2">
        <Text className="text-base">
          Don&apos;t have an account ? Let&apos;s
        </Text>
        <Button onPress={navigateToRegister} title="Sign Up" />
      </View>
    </View>
  );
};

export default LoginScreen;
