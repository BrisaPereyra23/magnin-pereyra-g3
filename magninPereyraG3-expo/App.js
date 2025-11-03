
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {FontAwesome} from '@expo/vector-icons';
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Profile from "./src/screens/Profile";
import NewPost from "./src/screens/NewPost";

const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewPost" component={NewPost} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Header" component={Header} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}


