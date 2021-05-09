import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedScreen from './FeedScreen';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
