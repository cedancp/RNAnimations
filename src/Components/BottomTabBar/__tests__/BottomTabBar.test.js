import React from 'react';
import {render} from 'react-native-testing-library';
import BottomTabBar from '../BottomTabBar';
import {Animated} from 'react-native';

describe('Bottom tab ber', () => {
  it('should render correctly bottom tab bar', () => {
    render(<BottomTabBar />);
  });

  it('should start animation', () => {
    const animatedSpy = jest.spyOn(Animated, 'sequence');
    render(<BottomTabBar />);
    expect(animatedSpy).toHaveBeenCalledTimes(1);
  });
});
