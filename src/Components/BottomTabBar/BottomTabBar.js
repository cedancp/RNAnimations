import React, {useRef, useEffect} from 'react';
import {Animated, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import TabIcon from './TabIcon/TabIcon';
import tabItems from '../../data/tabItems';
import {TAB_HEIGHT} from './bottomTabBarConstants';
import styles from './styles';

const BottomTabBar = ({delay}) => {
  const slideUp = useRef(new Animated.Value(TAB_HEIGHT)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.spring(slideUp, {
        toValue: 0,
        damping: 20,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateY: slideUp}],
        },
      ]}>
      <SafeAreaView style={styles.buttonsContainer}>
        {tabItems.map((tabItem, index) => (
          <TabIcon
            key={index.toString()}
            image={tabItem.image}
            title={tabItem.title}
            active={index === 0}
          />
        ))}
      </SafeAreaView>
    </Animated.View>
  );
};

BottomTabBar.propTypes = {
  delay: PropTypes.number,
};

export default BottomTabBar;
