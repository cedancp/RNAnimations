import {render} from 'react-native-testing-library';
import React from 'react';
import Product from '../Product';
import {Animated} from 'react-native';
import { TYPE_PRODUCT, TYPE_BUTTON } from '../productConstants';

describe('Product item', () => {
  const props = {
    image: 1231,
    title: 'Test title',
    description: 'Test description',
    active: false,
    type: TYPE_PRODUCT,
  };

  const wrapper = (active = false, type = TYPE_PRODUCT) => {
    const newProps = {
      ...props,
      active,
      type,
    };
    return render(<Product {...newProps} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly Product', () => {
    wrapper();
  });

  it('should render container', () => {
    const {getByTestId} = wrapper();

    getByTestId('container-product');
  });

  it('should render product image', () => {
    const {getByTestId} = wrapper();

    getByTestId('image-product');
  });

  it('should render inner information container', () => {
    const {getByTestId} = wrapper();

    getByTestId('card-product');
  });

  it('should render product title with text', () => {
    const {getByTestId} = wrapper();

    const title = getByTestId('title-product');

    expect(title.children[0]).toBe(props.title);
  });

  it('should render product description with text', () => {
    const {getByTestId} = wrapper();

    const description = getByTestId('description-product');

    expect(description.children[0]).toBe(props.description);
  });

  it('should render view product', () => {
    const {getByTestId} = wrapper();

    getByTestId('view-product');
  });

  it('should start animation when switching to active', () => {
    const animatedSpy = jest.spyOn(Animated, 'parallel');
    wrapper(true);
    expect(animatedSpy).toHaveBeenCalledTimes(1);
  });

  it('should start animation when switching to inctive', () => {
    const animatedSpy = jest.spyOn(Animated, 'parallel');
    wrapper(false);
    expect(animatedSpy).toHaveBeenCalledTimes(1);
  });

  it('should show image when type is product', () => {
    const {getByTestId} = wrapper(true, TYPE_PRODUCT);

    expect(() => getByTestId('image-product')).not.toThrow(
      'No instances found with testID: image-product',
    );
  });

  it('should not show image when type is button', () => {
    const {getByTestId} = wrapper(true, TYPE_BUTTON);

    expect(() => getByTestId('image-product')).toThrow(
      'No instances found with testID: image-product',
    );
  });

  it('should show button when type is button', () => {
    const {getByTestId} = wrapper(true, TYPE_BUTTON);

    expect(() => getByTestId('button-product')).not.toThrow(
      'No instances found with testID: button-product',
    );
  });

  it('should not show button when type is product', () => {
    const {getByTestId} = wrapper(true, TYPE_PRODUCT);

    expect(() => getByTestId('button-product')).toThrow(
      'No instances found with testID: button-product',
    );
  });
});
