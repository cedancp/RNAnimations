import React, {useRef, useEffect} from 'react';
import {View, Animated} from 'react-native';
import styles from './styles';
import {
  ANIM_DURATION,
  DAMPING,
  BOTTOM_CONTAINER_HEIGHT,
  TOP_CONTAINER_HEIGHT,
} from './backgroundConstants';

const Background = () => {
  const bottomSlideUp = useRef();
  const topSlideUp = useRef();

  const slideUp = () => {
    bottomSlideUp.current = new Animated.Value(0);
    topSlideUp.current = new Animated.Value(0);
    Animated.spring(topSlideUp.current, {
      toValue: -TOP_CONTAINER_HEIGHT,
      duration: ANIM_DURATION,
      damping: DAMPING,
      useNativeDriver: true,
    }).start();

    Animated.spring(bottomSlideUp.current, {
      toValue: -BOTTOM_CONTAINER_HEIGHT,
      duration: ANIM_DURATION,
      damping: DAMPING,
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