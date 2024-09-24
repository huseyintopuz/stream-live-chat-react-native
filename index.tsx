import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/utils/RootNavigation';
import { Provider } from './src/context/auth';

const AppWrapper = () => (
  <Provider>
    <RootSiblingParent>
      <NavigationContainer ref={navigationRef}>
        <App />
      </NavigationContainer>
    </RootSiblingParent>
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppWrapper);
