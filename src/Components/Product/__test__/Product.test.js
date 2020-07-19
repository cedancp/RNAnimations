import {render} from 'react-native-testing-library';
import React from 'react';
import Product from '../Product';
import {Animated} from 'react-native';

describe('Product item', () => {
  const props = {
    image: 1231,
    title: 'Test title',
    description: 'Test description',
    active: false,
  };

  const wrapper = (active = false) => {
    const newProps = {
      ...props,
      active,
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
});
