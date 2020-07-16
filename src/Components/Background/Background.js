import React, {useRef, useEffect} from 'react';
import {View, Animated, Dimensions} from 'react-native';
import styles from './styles';

const Background = () => {
  const bottomSlideUp = useRef(new Animated.Value(0)).current;
  const topSlideUp = useRef(new Animated.Value(0)).current;

  const slideUp = () => {
    Animated.spring(topSlideUp, {
      toValue: -150,
      duration: 800,
      damping: 30,
      useNativeDriver: true,
    }).start();

    Animated.spring(bottomSlideUp, {
      toValue: -Dimensions.get('window').height * 0.6,
      duration: 800,
      damping: 30,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slideUp();
  }, []);

  return (
    <View style={styles.container} testID="background">
      <Animated.View
        style={[
          styles.topContainer,
          {
            transform: [{translateY: topSlideUp}],
          },
        ]}>
        <View style={styles.lightBlueTopTriangle} />
      </Animated.View>
      <Animated.View
        style={[
          styles.middleContainer,
          {
            transform: [{translateY: topSlideUp}],
          },
        ]}>
        <View style={styles.lightBlueLeftTriangle} />
        <View style={styles.greenRightTriangle} />
      </Animated.View>
      <View style={styles.bottomDarkTriangle} />
      <Animated.View
        style={[
          styles.bottomContainer,
          {
            transform: [{translateY: bottomSlideUp}],
          },
        ]}>
        <View style={styles.bottomTopRectangle} />
        <View style={styles.bottomRectangle} />
      </Animated.View>
    </View>
  );
};

export default Background;
