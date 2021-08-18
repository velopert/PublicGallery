import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';

function MainTab() {
  const {user} = useUserContext();
  return (
    <View style={styles.block}>
      {user.photoURL && (
        <Image
          source={{uri: user.photoURL}}
          style={{width: 128, height: 128, marginBottom: 16}}
          resizeMode="cover"
        />
      )}
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
