import React from 'react';
import {View, Image, Text} from 'react-native';
import PropTypes from 'prop-types';

const Profile = ({image, name, notification}) => {
  return (
    <View testID="profile">
      <Image testID="profile-image" source={image} />
      <Text testID="profile-name">{name}</Text>
      <View testID="profile-notification">
        <Text testID="notification">{notification}</Text>
      </View>
    </View>
  );
};

Profile.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  notification: PropTypes.string.isRequired,
};

export default Profile;
