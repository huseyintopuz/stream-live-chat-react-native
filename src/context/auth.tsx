import React, { useContext, useEffect, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { AuthContextType, UserType } from '../types/types';

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

type ProviderProps = {
  children: React.ReactNode;
};

export function Provider({ children }: ProviderProps) {
  const [user, setAuth] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getUserFromStorage() {
      setIsLoading(true);
      try {
        const savedUserJSON = await EncryptedStorage.getItem('token');
        if (savedUserJSON) {
          const savedUser: UserType = JSON.parse(savedUserJSON);
          setAuth(savedUser);
        }
      } catch (error) {
        console.error('Error getting user:', error);
      } finally {
        setIsLoading(false);
      }
    }
    getUserFromStorage();
  }, []);

  const signOut = async () => {
    try {
      await EncryptedStorage.removeItem('token');
      setAuth(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: async (user: UserType) => {
          const userToSave = JSON.stringify(user);
          await EncryptedStorage.setItem('token', userToSave);
          setAuth(user);
        },
        signOut,
        user,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
