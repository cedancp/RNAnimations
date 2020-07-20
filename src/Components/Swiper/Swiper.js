import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, View, Animated, ScrollView} from 'react-native';
import {
  getScrollPadding,
  getItemMarginLeft,
  getItemOffsets,
} from './swiperUtils';
import Dot from './Dot/Dot';
import styles from './styles';

const Swiper = ({
  itemWidth,
  nextItemVisibleOffset,
  items,
  renderItem,
  animationDelay,
}) => {
  const [active, setActive] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const xOffset = useRef(0);
  const scrollViewRef = useRef();
  const slideIn = useRef(new Animated.Value(screenWidth)).current;
  const scrollPadding = getScrollPadding(itemWidth);
  const itemMarginLeft = getItemMarginLeft(
    scrollPadding,
    nextItemVisibleOffset,
  );
  const itemOffsets = getItemOffsets(
    items.length,
    scrollPadding,
    nextItemVisibleOffset,
  );

  const _onScroll = ({nativeEvent}) => {
    const scrollEndOffset = nativeEvent.contentOffset.x;
    const nextSnapOffset = itemOffsets[active] + itemWidth / 2;
    const previousSnapOffset = itemOffsets[active] - itemWidth / 2;
    const nextActive = active + 1;
    const previousActive = active - 1;
    xOffset.current = scrollEndOffset;
    if (isScrolling === false) {
      if (scrollEndOffset > nextSnapOffset && active < items.length - 1) {
        setIsScrolling(true);
        setActive(nextActive);
      } else if (scrollEndOffset <= previousSnapOffset && active > 0) {
        setIsScrolling(true);
        setActive(previousActive);
      }
    }
  };

  const _onMomentumScrollEnd = () => {
    setIsScrolling(false);
    let currentActive = 0;
    itemOffsets.forEach((offset, index) => {
      if (Math.floor(xOffset.current) >= Math.floor(offset)) {
        currentActive = index;
      }
    });

    setActive(currentActive);
  };

  useEffect(() => {
    Animated.spring(slideIn, {
      toValue: 0,
      damping: 20,
      delay: animationDelay,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateX: slideIn}],
        },
      ]}>
      <ScrollView
        testID="swiper"
        ref={scrollViewRef}
        contentContainerStyle={[
          styles.cardsContainer,
          {
            paddingHorizontal: scrollPadding,
          },
        ]}
        disableIntervalMomentum={true}
        bounces={false}
        onScroll={_onScroll}
        onMomentumScrollEnd={_onMomentumScrollEnd}
        scrollEventThrottle={1}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToOffsets={itemOffsets}
        decelerationRate="fast">
        {items.map((item, index) => (
          <View
            testID={`item-${index}`}
            key={`item-${index}`}
            style={index !== 0 && {marginLeft: itemMarginLeft}}>
            {renderItem(item, index, index === active)}
          </View>
        ))}
      </ScrollView>
      <View testID="dots" style={styles.dots}>
        {items.map((item, index) => (
          <Dot
            key={`dot-${index}`}
            style={styles.dot}
            color="#A0A9B8"
            activeColor="#424A93"
            active={index === active}
          />
        ))}
      </View>
    </Animated.View>
  );
};

Swiper.propTypes = {
  itemWidth: PropTypes.number.isRequired,
  nextItemVisibleOffset: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  animationDelay: PropTypes.number,
};

export default Swiper;
