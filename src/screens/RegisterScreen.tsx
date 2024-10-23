import { View, SafeAreaView, TextInput, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import UserIcon from '../assets/icons/user.svg';
import PasswordIcon from '../assets/icons/padlock.svg';
import LoginButton from '../components/buttons/LoginButton';
import CustomBottomAlert from '../components/alerts/CustomBottomAlert';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../api/api';
import LeftArrowIcon from '../assets/icons/left-arrow.svg';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../constants/regex';
const RegisterScreen = () => {
  const navigation = useNavigation();
  const userRef = useRef<TextInput>(null);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    matchPassword: '',
  });
  const [bottomAlertVisible, setBottomAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validMail, setValidMail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const { email, password, matchPassword } = userData;
  const padding = Platform.OS === 'ios' ? 'py-3' : '';

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidMail(result);
    const resultPassword = PASSWORD_REGEX.test(password);
    setValidPwd(resultPassword);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [email, password, matchPassword]);

  const handleInputChange = (field: string, value: string | number) => {
    setUserData(prevUserData => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const fields = [
      { field: email, message: 'Please enter your email' },
      { field: password, message: 'Please enter your password' },
      { field: matchPassword, message: 'Please re-enter your password' },
      { field: validMail, message: 'The email address you entered is invalid' },
      {
        field: validPwd,
        message:
          'It must be at least eight characters long and contain a number, uppercase, and lowercase letter.',
      },
      { field: validMatch, message: 'The passwords you entered do not match' },
    ];

    for (const field of fields) {
      if (!field.field) {
        setAlertMessage(field.message);
        setBottomAlertVisible(true);
        return;
      }
    }

    await registerUser({
      userData,
      navigation,
      setAlertMessage,
      setBottomAlertVisible,
      setIsSubmitting,
    });
  };
  console.log(alertMessage);

  return (
    <SafeAreaView className="flex-1">
      <LeftArrowIcon
        width={30}
        height={30}
        onPress={() => navigation.goBack()}
        style={{ marginLeft: 16 }}
      />
      <View className="flex-1 justify-center items-center">
        <View className="w-4/5 bg-white border-[#EFEFEF] border rounded-2xl p-10 space-y-4">
          <View
            className={`${padding} flex-row items-center bg-[#fff] border border-gray-300 shadow pl-2 rounded-lg space-x-2`}>
            <UserIcon width={20} height={20} />
            <TextInput
              value={email}
              onChangeText={value => handleInputChange('email', value)}
              placeholder="Email"
              className="w-52 text-black"
              placeholderTextColor="gray"
              ref={userRef}
            />
          </View>
          <View
            className={`${padding} flex-row items-center bg-[#fff] border border-gray-300 shadow pl-2 rounded-lg space-x-2`}>
            <PasswordIcon width={20} height={20} />
            <TextInput
              value={password}
              onChangeText={value => handleInputChange('password', value)}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="gray"
              className="w-52 text-black"
            />
          </View>
          <View
            className={`${padding} flex-row items-center bg-[#fff] border border-gray-300 shadow pl-2 rounded-lg space-x-2`}>
            <PasswordIcon width={20} height={20} />
            <TextInput
              value={matchPassword}
              onChangeText={value => handleInputChange('matchPassword', value)}
              placeholder="Confirm Password"
              secureTextEntry={true}
              placeholderTextColor="gray"
              className="w-52 text-black"
            />
          </View>
          <View>
            <LoginButton
              isSubmitting={isSubmitting}
              onPress={handleSubmit}
              text="REGISTER"
            />
          </View>
          <CustomBottomAlert
            visible={bottomAlertVisible}
            message={alertMessage}
            onClose={() => setBottomAlertVisible(false)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
