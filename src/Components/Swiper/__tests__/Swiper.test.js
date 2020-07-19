import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import Swiper from '../Swiper';
import {
  getScrollPadding,
  getItemMarginLeft,
  getItemOffsets,
} from '../swiperUtils';
import {Animated} from 'react-native';

describe('Swiper component', () => {
  const mockOnSnap = jest.fn();
  const mockRenderItem = jest.fn();
  const props = {
    itemWidth: 200,
    nextItemVisibleOffset: 40,
    items: [1, 2, 3],
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

    expect(scrollViewStyle[1]).toHaveProperty(
      'paddingHorizontal',
      expectedPadding,
    );
  });

  it('should not set marginLeft when is the first item', () => {
    const {getByTestId} = wrapper();

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

  it('should set second item as active', () => {
    const itemsOffset = getItemOffsets(
      3,
      getScrollPadding(props.itemWidth),
      props.nextItemVisibleOffset,
    );

    const eventData = {
      nativeEvent: {
        contentOffset: {
          x: itemsOffset[1],
        },
      },
    };
    const {getByTestId, update} = wrapper();

    const scrollViewComponent = getByTestId('swiper');
    fireEvent.scroll(scrollViewComponent, eventData);

    update(<Swiper {...props} />);

    expect(
      mockRenderItem.mock.calls[mockRenderItem.mock.calls.length - 2],
    ).toEqual([2, 1, true]);
  });

  it('should set first item as active after scrolling back', () => {
    const itemsOffset = getItemOffsets(
      3,
      getScrollPadding(props.itemWidth),
      props.nextItemVisibleOffset,
    );

    const eventData = {
      nativeEvent: {
        contentOffset: {
          x: itemsOffset[1],
        },
      },
    };
    const eventDataBack = {
      nativeEvent: {
        contentOffset: {
          x: 0,
        },
      },
    };
    const {getByTestId, update} = wrapper();

    const scrollViewComponent = getByTestId('swiper');
    fireEvent.scroll(scrollViewComponent, eventData);
    fireEvent(scrollViewComponent, 'momentumScrollEnd', eventData);
    update(<Swiper {...props} />);
    fireEvent.scroll(scrollViewComponent, eventDataBack);
    update(<Swiper {...props} />);

    expect(
      mockRenderItem.mock.calls[mockRenderItem.mock.calls.length - 3],
    ).toEqual([1, 0, true]);
  });

  it('should not set active if scrolling is ongoing', () => {
    const itemsOffset = getItemOffsets(
      3,
      getScrollPadding(props.itemWidth),
      props.nextItemVisibleOffset,
    );

    const eventData = {
      nativeEvent: {
        contentOffset: {
          x: itemsOffset[1],
        },
      },
    };
    const eventDataBack = {
      nativeEvent: {
        contentOffset: {
          x: 0,
        },
      },
    };
    const {getByTestId} = wrapper();

    const scrollViewComponent = getByTestId('swiper');
    fireEvent.scroll(scrollViewComponent, eventData);
    fireEvent.scroll(scrollViewComponent, eventDataBack);

    expect(
      mockRenderItem.mock.calls[mockRenderItem.mock.calls.length - 2],
    ).toEqual([2, 1, true]);
  });

  it('should call render item for each data element', () => {
    wrapper();

    expect(mockRenderItem).toHaveBeenCalledTimes(props.items.length);
  });

  it('should call slide in animation', () => {
    const animatedSpy = jest.spyOn(Animated, 'spring');
    wrapper();
    expect(animatedSpy).toHaveBeenCalledTimes(1);
  });

  it('should render dots', () => {
    const {getByTestId} = wrapper();

    getByTestId('dots');
  });
});
