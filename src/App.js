/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar, Text} from 'react-native';
import Background from './Components/Background/Background';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Background testID="background" />
    </>
  );
};

export default App;
