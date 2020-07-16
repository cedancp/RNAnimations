import React from 'react';
import {render} from 'react-native-testing-library';
import Background from '../Background';
import {Animated} from 'react-native';

it('should render background container', () => {
  const {getByTestId} = render(<Background />);

  getByTestId('background');
});

it('should start animations', () => {
  const animatedSpy = jest.spyOn(Animated, 'spring');
  render(<Background />);

  expect(animatedSpy).toHaveBeenCalledTimes(2);
});
