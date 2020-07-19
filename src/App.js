/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import Background from './Components/Background/Background';
import Profile from './Components/Profile/Profile';
import images from '@assets';
import styles from './styles';
import Swiper from './Components/Swiper/Swiper';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Background />
      <Profile
        style={styles.profile}
        image={images.profileImage}
        name="Lottie Curtis"
        notification="You have 3 products"
      />
    </>
  );
};

export default App;
