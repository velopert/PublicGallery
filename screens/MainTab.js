import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';

function MainTab() {
  const {user} = useUserContext();
  return (
    <View style={styles.block}>
      <Text style={styles.text}>Hello, {user.displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default MainTab;
