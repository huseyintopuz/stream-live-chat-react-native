import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    AuthStackScreen: undefined;
    SplashScreen: undefined;
    HomeScreen: undefined;
    LoginScreen: { successMessage?: string | undefined };
    RegisterScreen: undefined;
    CallScreen: { callId: string };
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