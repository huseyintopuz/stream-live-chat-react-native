import axios from 'axios';
import { BASE_URL } from '@env';

export const handleSignIn = async ({
  email,
  password,
  setAlertMessage,
  setBottomAlertVisible,
  signIn,
  navigation,
  setIsSubmitting,
}) => {
  setIsSubmitting(true);
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: email,
      password: password,
    });
    const user = response?.data;
    signIn(user);
    navigation.replace('HomeScreen');
  } catch (err) {
    console.log(err);

    setBottomAlertVisible(true);
    if (!err.response === 200) {
      setAlertMessage('Sunucu Yanıtı Yok');
    } else if (err.response?.status === 400) {
      setAlertMessage(err.response.data.error);
    } else if (err.response?.status === 401) {
      setAlertMessage('Yetkiniz Yok');
    } else {
      setAlertMessage('Giriş başarısız oldu');
    }
  } finally {
    setIsSubmitting(false);
  }
};

export const registerUser = async ({
  userData,
  navigation,
  setAlertMessage,
  setBottomAlertVisible,
  setIsSubmitting,
}) => {
  try {
    setIsSubmitting(true);
    await axios.post(
      `${BASE_URL}/register`,
      {
        email: userData.email,
        password: userData.password,
      },
      {},
    );
    navigation.navigate('LoginScreen', {
      successMessage:
        'Your account has been created successfully, Please login',
    });
  } catch (error) {
    setBottomAlertVisible(true);
    console.log(error.response.data);

    setAlertMessage(error.response.data.error.message);
  } finally {
    setIsSubmitting(false);
  }
};
