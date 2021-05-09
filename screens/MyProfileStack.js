import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyProfileScreen from './MyProfileScreen';

const Stack = createStackNavigator();

function MyProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
    </Stack.Navigator>
  );
}

export default MyProfileStack;
