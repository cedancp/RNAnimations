import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View, Text} from 'react-native';
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
  onSnap,
}) => {
  const [active, setActive] = useState(0);
  const scrollView = useRef();
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

  const _onScrollEndDrag = ({nativeEvent}) => {
    const scrollEndOffset = nativeEvent.contentOffset.x;
    const nextSnapOffset = itemOffsets[active] + itemWidth / 2 - 50;
    const previousSnapOffset = itemOffsets[active] - itemWidth / 2 + 50;
    const nextActive = active + 1;
    const previousActive = active - 1;
    if (scrollEndOffset > nextSnapOffset) {
      onSnap(nextActive);
      snapToActive(itemOffsets[nextActive]);
      setActive(nextActive);
    } else if (scrollEndOffset <= previousSnapOffset) {
      onSnap(previousActive);
      snapToActive(itemOffsets[previousActive]);
      setActive(previousActive);
    } else {
      snapToActive(itemOffsets[active]);
      onSnap(active);
    }
  };

  const snapToActive = () => {
    scrollView.current.scrollTo({x: itemOffsets[active], animated: true});
  };

  return (
    <ScrollView
      testID="swiper"
      ref={scrollView}
      contentContainerStyle={{
        paddingHorizontal: scrollPadding,
      }}
      onScrollEndDrag={_onScrollEndDrag}
      onScroll={null} // Set to mull just so test can simulate scroll
      scrollEventThrottle={1}
      horizontal={true}
      snapToOffsets={itemOffsets}
      decelerationRate={0}>
      {items.map((item, index) => (
        <View
          testID={`item-${index}`}
          key={item.toString()}
          style={index !== 0 && {marginLeft: itemMarginLeft}}>
          {renderItem(item)}
        </View>
      ))}
    </ScrollView>
  );
};

Swiper.propTypes = {
  itemWidth: PropTypes.number.isRequired,
  nextItemVisibleOffset: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  onSnap: PropTypes.func,
};

export default Swiper;
