import React from 'react';
import {render} from 'react-native-testing-library';
import Background from '../Background';
import {Animated} from 'react-native';
import {ANIM_DURATION} from '../backgroundConstants';

it('should render background container', () => {
  global.withAnimatedTimeTravelEnabled(() => { 
    const {getByTestId} = render(<Background />);
    global.timeTravel(ANIM_DURATION);

    getByTestId('background');
  });
});

it('should start animations', () => {
  global.withAnimatedTimeTravelEnabled(() => { 
    const animatedSpy = jest.spyOn(Animated, 'spring');
    render(<Background />);
    global.timeTravel(ANIM_DURATION);
    expect(animatedSpy).toHaveBeenCalledTimes(2);
  });
});
