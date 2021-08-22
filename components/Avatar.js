import React from 'react';
import {Image} from 'react-native';

function Avatar({source, size, style}) {
  return (
    <Image
      source={source || require('../assets/user.png')}
      resizeMode="cover"
      style={[
        style,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  );
}

Avatar.defaultProps = {
  size: 32,
};

export default Avatar;
