/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef, useEffect} from 'react';
import {StatusBar, ScrollView} from 'react-native';
import Background from './Components/Background/Background';
import Profile from './Components/Profile/Profile';
import images from '@assets';
import styles from './styles';
import Swiper from './Components/Swiper/Swiper';
import {productCardWidth} from './config/constants';
import products from './data/products';
import Product from './Components/Product/Product';
import BottomTabBar from './Components/BottomTabBar/BottomTabBar';
import { TYPE_BUTTON, TYPE_PRODUCT } from './Components/Product/productConstants';

const App = () => {
  const delayProduct = useRef(300);
  const renderProductsItem = (item, index, active) => {
    return (
      <Product
        title={item.title}
        description={item.description}
        image={item.image}
        active={active}
        delay={delayProduct.current}
        type={index === products.length - 1 ? TYPE_BUTTON : TYPE_PRODUCT}
      />
    );
  };

  useEffect(() => {
    delayProduct.current = 0;
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Background />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Profile
          style={styles.profile}
          image={images.profileImage}
          name="Lottie Curtis"
          notification="You have 3 products"
        />
        <Swiper
          itemWidth={productCardWidth}
          items={products}
          nextItemVisibleOffset={40}
          renderItem={renderProductsItem}
          animationDelay={300}
        />
      </ScrollView>
      <BottomTabBar delay={300} />
    </>
  );
};

export default App;
