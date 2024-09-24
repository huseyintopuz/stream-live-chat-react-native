import { StackNavigationProp } from "@react-navigation/stack";
import { StreamVideoClient } from "@stream-io/video-react-native-sdk";
import React from "react";

export type RootStackParamList = {
    Auth: undefined;
    SplashScreen: undefined;
    HomeScreen: undefined;
    LoginScreen: { successMessage?: string };
    RegisterScreen: undefined;
    RoomScreen: undefined;
};

export type RegisterScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'RegisterScreen'
>;

export type AuthContextType = {
    signIn: (user: UserType) => Promise<void>;
    signOut: () => Promise<void>;
    user: UserType | null;
    isLoading: boolean;
    client: StreamVideoClient | null;
    setClient: React.Dispatch<React.SetStateAction<StreamVideoClient | null>>
}

export type UserType = {
    token: string,
    user: {
        email: string,
        id: string,
    }
}

export type CustomBottomAlertProps = {
    visible: boolean;
    message: string;
    onClose: () => void;
}

export type LoginScreenProps = {
    onPress: () => void;
    isSubmitting?: boolean;
    text: string;
}