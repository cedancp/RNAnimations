import React from 'react';
import {render} from 'react-native-testing-library';
import Background from '../Background';
import {Animated} from 'react-native';

describe('Background component', () => {
  it('should render correctly Background', () => {
    render(<Background />);
  });

  it('should render background container', () => {
    const {getByTestId} = render(<Background />);
    getByTestId('background');
  });

  it('should start animations', () => {
    const animatedSpy = jest.spyOn(Animated, 'timing');
    render(<Background />);
    expect(animatedSpy).toHaveBeenCalledTimes(3);
  });
});
