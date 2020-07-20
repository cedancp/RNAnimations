import React, {useRef, useEffect} from 'react';
import {View, Animated} from 'react-native';
import styles from './styles';
import {
  ANIM_DURATION,
  BOTTOM_CONTAINER_HEIGHT,
  TOP_CONTAINER_HEIGHT,
} from './backgroundConstants';

const Background = () => {
  const topSlideUp = useRef(new Animated.Value(0)).current;
  const midSlideUp = useRef(new Animated.Value(0)).current;
  const bottomSlideUp = useRef(new Animated.Value(BOTTOM_CONTAINER_HEIGHT))
    .current;

  const slideUp = () => {
    Animated.sequence([
      Animated.delay(0),
      Animated.parallel([
        Animated.timing(topSlideUp, {
          toValue: -TOP_CONTAINER_HEIGHT,
          duration: ANIM_DURATION,
          useNativeDriver: true,
        }),

        Animated.timing(midSlideUp, {
          toValue: -TOP_CONTAINER_HEIGHT,
          duration: ANIM_DURATION,
          useNativeDriver: true,
        }),

        Animated.timing(bottomSlideUp, {
          toValue: 0,
          duration: ANIM_DURATION,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
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
            transform: [{translateY: midSlideUp}],
          },
        ]}>
        <Animated.View
          style={[
            styles.topContainerFirst,
            {
              transform: [{translateY: topSlideUp}],
            },
          ]}>
          <View style={styles.lightBlueTopTriangle} />
        </Animated.View>
        <View style={styles.middleContainer}>
          <View style={styles.lightBlueLeftTriangle} />
          <View style={styles.greenRightTriangle} />
        </View>
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
