import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View, Pressable, Platform, Image} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import {signOut} from '../lib/auth';
import {createUser} from '../lib/users';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Avatar from './Avatar';

function SetupProfile() {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();
  const {setUser} = useUserContext();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const {params} = useRoute();
  const {uid} = params || {};

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        console.log(res);
        if (res.didCancel) {
          // 취소했을 경우
          return;
        }
        console.log(res);
        setResponse(res);
      },
    );
  };

  const onSubmit = async () => {
    setLoading(true);

    let photoURL = null;

    if (response) {
      const extension = response.fileName.split('.').pop(); // 확장자 추출
      const reference = storage().ref(`/profile/${uid}.${extension}`);

      if (Platform.OS === 'android') {
        await reference.putString(response.base64, 'base64', {
          contentType: response.type,
        });
      } else {
        await reference.putFile(response.uri);
      }

      photoURL = response ? await reference.getDownloadURL() : null;
    }

    const user = {
      id: uid,
      displayName,
      photoURL,
    };

    createUser(user);
    setUser(user);
  };

  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={onSelectImage}>
        <Avatar source={response && {uri: response.uri}} size={128} />
      </Pressable>
      <View style={styles.form}>
        <BorderedInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />
        <View style={styles.buttons}>
          <CustomButton title="다음" onPress={onSubmit} hasMarginBottom />
          <CustomButton title="취소" onPress={onCancel} theme="secondary" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
});

export default SetupProfile;
