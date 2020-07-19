const {Dimensions} = require('react-native');
import {
  getScrollPadding,
  getItemMarginLeft,
  getItemOffsets,
} from '../swiperUtils';

describe('Swiper utils', () => {
  const itemWidht = 200;
  const itemVisbleOffset = 40;

  beforeAll(() => {
    Dimensions.get = jest.fn().mockReturnValue({
      width: 350,
    });
  });
  it('should return the scrollPadding based on itemWidth and screenWidth', () => {
    const expectedScrollPadding = 350 / 2 - itemWidht / 2;

    const scrollPadding = getScrollPadding(itemWidht);

    expect(scrollPadding).toBe(expectedScrollPadding);
  });

  it('should return marginLeft based on scrollPadding and item visible offset', () => {
    const expectedMarginLeft = 160;

    const marginLeft = getItemMarginLeft(itemWidht, itemVisbleOffset);

    expect(marginLeft).toBe(expectedMarginLeft);
  });

  it('should return a list of offset per item', () => {
    const scrollPadding = getScrollPadding(itemWidht);
    const expectOffsets = [
      0,
      350 - scrollPadding - itemVisbleOffset,
      2 * (350 - scrollPadding - itemVisbleOffset),
    ];

    const offsets = getItemOffsets(3, scrollPadding, itemVisbleOffset);

    expect(offsets).toStrictEqual(expectOffsets);
  });
});
