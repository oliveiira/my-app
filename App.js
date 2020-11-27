import 'react-native-gesture-handler';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NavigationContainer } from "@react-navigation/native";

import UserContextProvider from './src/contexts/UserContext';

import Preload from './src/screens/Preload';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <UserContextProvider>
          <NavigationContainer>
              <Stack.Navigator screenOptions={{initialRouteName: "Preload", headerShown: false}}>
                  <Stack.Screen name="Preload" component={Preload}/>
                  <Stack.Screen name="SignIn" component={SignIn}/>
                  <Stack.Screen name="SignUp" component={SignUp}/>
              </Stack.Navigator>
          </NavigationContainer>
      </UserContextProvider>
  );
}
