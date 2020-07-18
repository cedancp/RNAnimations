import React, {useRef, useEffect} from 'react';
import {View, Image, Text, Animated} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Profile = ({style, image, name, notification}) => {
  const slideUp = useRef(new Animated.Value(150)).current;

  const startAnimations = () => {
    Animated.timing(slideUp, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startAnimations();
  }, []);

  return (
    <Animated.View
      testID="profile"
      style={[style, styles.container, {transform: [{translateY: slideUp}]}]}>
      <Image testID="profile-image" source={image} />
      <Text testID="profile-name" style={styles.name}>
        {name}
      </Text>
      <View testID="profile-notification" style={styles.notificationContainer}>
        <Text testID="notification" style={styles.notification}>
          {notification}
        </Text>
      </View>
    </Animated.View>
  );
};

Profile.propTypes = {
  style: PropTypes.object,
  image: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  notification: PropTypes.string.isRequired,
};

export default Profile;
