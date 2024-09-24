import { useRef } from 'react';
import type { NavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from '../types/types';

export const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

export function navigate<T extends keyof RootStackParamList>(
    name: T,
    params?: RootStackParamList[T]
) {
    if (navigationRef.current) {
        navigationRef.current.navigate(name, params);

    }
}
