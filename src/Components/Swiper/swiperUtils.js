import {Dimensions} from 'react-native';

export const getScrollPadding = (itemWidth) => {
  return Dimensions.get('window').width / 2 - itemWidth / 2;
};

export const getItemMarginLeft = (scrollPadding, nextItemVisibleOffset) => {
  return scrollPadding - nextItemVisibleOffset;
};

export const getItemOffsets = (
  itemsNumber,
  scrollPadding,
  nextItemVisibleOffset,
) => {
  const screenWidth = Dimensions.get('window').width;
  const offsets = [];
  for (let i = 0; i < itemsNumber; i++) {
    offsets.push(i * (screenWidth - scrollPadding - nextItemVisibleOffset));
  }

  return offsets;
};
