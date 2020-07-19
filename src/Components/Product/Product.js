import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import styles from './styles';
import {SLIDE, DAMPING} from './productConstants';

const Product = ({image, title, description, active}) => {
  const scaleImage = useRef(new Animated.Value(0)).current;
  const slideTitle = useRef(new Animated.Value(SLIDE)).current;
  const slideDescription = useRef(new Animated.Value(SLIDE)).current;
  const slideView = useRef(new Animated.Value(SLIDE)).current;
  const slide = useRef(new Animated.Value(40)).current;

  const startEntryAnimation = () => {
    Animated.parallel([
      Animated.spring(slide, {
        toValue: 0,
        damping: 20,
        useNativeDriver: true,
      }),
      Animated.spring(scaleImage, {
        toValue: 1,
        damping: DAMPING,
        useNativeDriver: true,
      }),
      Animated.spring(slideTitle, {
        toValue: 0,
        damping: DAMPING,
        useNativeDriver: true,
      }),
      Animated.spring(slideDescription, {
        toValue: 0,
        damping: DAMPING,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.spring(slideView, {
        toValue: 0,
        damping: DAMPING,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startOutAnimation = () => {
    Animated.parallel([
      Animated.spring(slide, {
        toValue: 40,
        damping: 20,
        useNativeDriver: true,
      }),
      Animated.spring(scaleImage, {
        toValue: 0,
        damping: DAMPING,
        useNativeDriver: true,
      }),
      Animated.spring(slideTitle, {
        toValue: SLIDE,
        damping: DAMPING,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.spring(slideDescription, {
        toValue: SLIDE,
        damping: DAMPING,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.spring(slideView, {
        toValue: SLIDE,
        damping: DAMPING,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (active === true) {
      startEntryAnimation();
    } else {
      startOutAnimation();
    }
  }, [active]);

  return (
    <Animated.View
      testID="container-product"
      style={[
        styles.container,
        {
          transform: [{translateY: slide}],
        },
      ]}>
      <Animated.Image
        testID="image-product"
        style={[
          styles.image,
          {
            transform: [{scale: scaleImage}],
          },
        ]}
        resizeMode="contain"
        source={image}
      />
      <View testID="card-product" style={styles.card}>
        <View>
          <Animated.Text
            testID="title-product"
            style={[
              styles.title,
              {
                opacity: slideTitle.interpolate({
                  inputRange: [0, 40],
                  outputRange: [1, 0],
                }),
                transform: [{translateY: slideTitle}],
              },
            ]}>
            {title}
          </Animated.Text>
          <Animated.Text
            testID="description-product"
            style={[
              styles.description,
              {
                opacity: slideDescription.interpolate({
                  inputRange: [0, 40],
                  outputRange: [1, 0],
                }),
                transform: [{translateY: slideDescription}],
              },
            ]}>
            {description}
          </Animated.Text>
        </View>
        <Animated.View
          style={{
            opacity: slideView.interpolate({
              inputRange: [0, 40],
              outputRange: [1, 0],
            }),
            transform: [{translateY: slideView}],
          }}>
          <TouchableOpacity testID="view-product" style={styles.view}>
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

Product.propTypes = {
  image: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default Product;
