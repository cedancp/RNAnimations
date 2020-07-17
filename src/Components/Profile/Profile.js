import React from 'react';
import {View, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Profile = ({style, image, name, notification}) => {
  return (
    <View testID="profile" style={[style, styles.container]}>
      <Image testID="profile-image" source={image} />
      <Text testID="profile-name" style={styles.name}>
        {name}
      </Text>
      <View testID="profile-notification" style={styles.notificationContainer}>
        <Text testID="notification" style={styles.notification}>
          {notification}
        </Text>
      </View>
    </View>
  );
};

Profile.propTypes = {
  style: PropTypes.object,
  image: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  notification: PropTypes.string.isRequired,
};

export default Profile;
