import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';

import Profile from '../components/Profile';
import {useUserContext} from '../contexts/UserContext';

import IconRightButton from '../components/IconRightButton';

function MyProfileScreen() {
  const {user} = useUserContext();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: user.displayName,
      headerRight: () => (
        <IconRightButton
          name="settings"
          onPress={() => navigation.push('Setting')}
        />
      ),
    });
  }, [navigation, user]);

  return <Profile userId={user.id} />;
}

export default MyProfileScreen;
