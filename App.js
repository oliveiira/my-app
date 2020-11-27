import 'react-native-gesture-handler';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import Preload from './screens/Preload';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import {NavigationContainer} from "@react-navigation/native";

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          initialRouteName: "Preload",
          headerShown: false
        }}>
          <Stack.Screen name="Preload" component={Preload}/>
          <Stack.Screen name="SignIn" component={SignIn}/>
          <Stack.Screen name="SignUp" component={SignUp}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
