import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import Swiper from '../Swiper';
import {
  getScrollPadding,
  getItemMarginLeft,
  getItemOffsets,
} from '../swiperUtils';

describe('Swiper component', () => {
  const mockOnSnap = jest.fn();
  const mockRenderItem = jest.fn();
  const props = {
    itemWidth: 200,
    nextItemVisibleOffset: 40,
    items: [1, 2, 3, 4],
    onSnap: mockOnSnap,
    renderItem: mockRenderItem,
  };

  const wrapper = () => {
    return render(<Swiper {...props} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly Slider', () => {
    wrapper();
  });

  it('should set scroll padding', () => {
    const {getByTestId} = wrapper();
    const expectedPadding = getScrollPadding(props.itemWidth);

    const scrollViewComponent = getByTestId('swiper');
    const scrollViewStyle = scrollViewComponent.props.contentContainerStyle;

    expect(scrollViewStyle).toHaveProperty(
      'paddingHorizontal',
      expectedPadding,
    );
  });

  it('should not set marginLeft when is the first item', () => {
    const {getByTestId} = wrapper();
    const expectedMarginLeft = 0;

    const fisrtItem = getByTestId('item-0');
    const firstItemStyle = fisrtItem.props.style;

    expect(firstItemStyle).not.toHaveProperty('marginLeft');
  });

  it('should set marginLeft when is the first item', () => {
    const {getByTestId} = wrapper();
    const expectedMarginLeft = getItemMarginLeft(
      getScrollPadding(props.itemWidth),
      props.nextItemVisibleOffset,
    );

    const fisrtItem = getByTestId('item-1');
    const firstItemStyle = fisrtItem.props.style;

    expect(firstItemStyle).toHaveProperty('marginLeft', expectedMarginLeft);
  });

  it('should set offsets', () => {
    const {getByTestId} = wrapper();
    const expectedOffsets = getItemOffsets(
      props.items.length,
      getScrollPadding(props.itemWidth),
      props.nextItemVisibleOffset,
    );

    const scrollViewComponent = getByTestId('swiper');
    const snapToOffsetsProps = scrollViewComponent.props.snapToOffsets;

    expect(snapToOffsetsProps).toStrictEqual(expectedOffsets);
  });

  it('should snap to next item when scroll ends and is bigger than half next offset', () => {
    const expectedNextItemSnap = 1;

    const eventData = {
      nativeEvent: {
        contentOffset: {
          x: props.itemWidth / 2 + 1,
        },
      },
    };
    const {getByTestId} = wrapper();

    const scrollViewComponent = getByTestId('swiper');
    fireEvent(scrollViewComponent, 'scrollEndDrag', eventData);

    expect(mockOnSnap).toHaveBeenCalledWith(expectedNextItemSnap);
  });

  it('should snap to previous item when scroll ends and is bigger than half previous offset', () => {
    const expectedNextItemSnap = 0;

    const eventData = {
      nativeEvent: {
        contentOffset: {
          x: props.itemWidth / 2 + 1,
        },
      },
    };

    const eventDataBack = {
      nativeEvent: {
        contentOffset: {
          x: props.itemWidth / 2 + 1,
        },
      },
    };
    const {getByTestId} = wrapper();

    const scrollViewComponent = getByTestId('swiper');
    fireEvent(scrollViewComponent, 'scrollEndDrag', eventData);
    fireEvent(scrollViewComponent, 'scrollEndDrag', eventDataBack);

    expect(mockOnSnap).toHaveBeenCalledWith(expectedNextItemSnap);
  });

  it('should snap to current item when scroll ends and is not bigger than half previous offset', () => {
    const expectedNextItemSnap = 0;

    const eventData = {
      nativeEvent: {
        contentOffset: {
          x: 10,
        },
      },
    };
    const {getByTestId} = wrapper();

    const scrollViewComponent = getByTestId('swiper');
    fireEvent(scrollViewComponent, 'scrollEndDrag', eventData);

    expect(mockOnSnap).toHaveBeenCalledWith(expectedNextItemSnap);
  });

  it('should call render item for each data element', () => {
    wrapper();

    expect(mockRenderItem).toHaveBeenCalledTimes(props.items.length);
  });
});
