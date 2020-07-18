import React, {useRef, useEffect} from 'react';
import {Text, Animated} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import {MAIN_ANIMATION_DURATION, DELAY, FRICTION} from './profileConstants';

const Profile = ({style, image, name, notification}) => {
  const slideUp = useRef(new Animated.Value(150)).current;
  const textSlideUp = useRef(new Animated.Value(10)).current;
  const notificationSlideUp = useRef(new Animated.Value(40)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const notificationOpacity = useRef(new Animated.Value(0)).current;

  const startAnimations = () => {
    Animated.parallel([
      Animated.timing(slideUp, {
        toValue: 0,
        duration: MAIN_ANIMATION_DURATION,
        useNativeDriver: true,
      }),

      Animated.spring(textSlideUp, {
        toValue: 0,
        friction: FRICTION,
        delay: DELAY,
        useNativeDriver: true,
      }),

      Animated.spring(notificationSlideUp, {
        toValue: 0,
        friction: FRICTION,
        delay: DELAY,
        useNativeDriver: true,
      }),

      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: MAIN_ANIMATION_DURATION,
        useNativeDriver: true,
      }),

      Animated.timing(notificationOpacity, {
        toValue: 1,
        duration: MAIN_ANIMATION_DURATION,
        delay: DELAY,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    startAnimations();
  }, []);

  return (
    <Animated.View
      testID="profile"
      style={[style, styles.container, {transform: [{translateY: slideUp}]}]}>
      <Animated.Image
        testID="profile-image"
        source={image}
        style={{opacity: imageOpacity}}
      />
      <Animated.Text
        testID="profile-name"
        style={[
          styles.name,
          {
            transform: [{translateY: textSlideUp}],
            opacity: imageOpacity,
          },
        ]}>
        {name}
      </Animated.Text>
      <Animated.View
        testID="profile-notification"
        style={[
          styles.notificationContainer,
          {
            transform: [{translateY: notificationSlideUp}],
            opacity: notificationOpacity,
          },
        ]}>
        <Text testID="notification" style={styles.notification}>
          {notification}
        </Text>
      </Animated.View>
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
