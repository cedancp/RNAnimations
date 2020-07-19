import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, View, Animated} from 'react-native';
import {
  getScrollPadding,
  getItemMarginLeft,
  getItemOffsets,
} from './swiperUtils';

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
      if (xOffset.current >= offset) {
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
    <Animated.ScrollView
      testID="swiper"
      ref={scrollViewRef}
      style={{
        transform: [{translateX: slideIn}],
      }}
      contentContainerStyle={{
        paddingHorizontal: scrollPadding,
      }}
      disableIntervalMomentum={true}
      disableScrollViewPanResponder={true}
      bounces={false}
      pagingEnabled={true}
      onScroll={_onScroll}
      onMomentumScrollEnd={_onMomentumScrollEnd}
      scrollEventThrottle={1}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      snapToInterval={screenWidth - 2 * nextItemVisibleOffset}
      snapToAlignment={'center'}
      decelerationRate={0.9}>
      {items.map((item, index) => (
        <View
          testID={`item-${index}`}
          key={`item-${index}`}
          style={index !== 0 && {marginLeft: itemMarginLeft}}>
          {renderItem(item, index, index === active)}
        </View>
      ))}
    </Animated.ScrollView>
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
