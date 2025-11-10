import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Comments from "../screens/Comments"; 

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}/>
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="comments" size={size} color={color} />
          ),
        }}/>
    </Stack.Navigator>
  );
}

export default HomeStack