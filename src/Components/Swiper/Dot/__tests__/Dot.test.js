import React from 'react';
import {render} from 'react-native-testing-library';
import Dot from '../Dot';

describe('Dot', () => {
  const props = {
    active: true,
    color: 'white',
    activeColor: '#000000',
  };

  const wrapper = (active = true) => {
    const newProps = {
      ...props,
      active,
    };
    return render(<Dot {...newProps} />);
  };

  it('should render correctly dot', () => {
    wrapper();
  });

  it('should not set active color when not active', () => {
    const {getByTestId} = wrapper(false);
    const dot = getByTestId('dot');

    expect(dot.props.style[2]).toHaveProperty('backgroundColor', props.color);
  });

  it('should set active color when active', () => {
    const {getByTestId} = wrapper();
    const dot = getByTestId('dot');

    expect(dot.props.style[2]).toHaveProperty(
      'backgroundColor',
      props.activeColor,
    );
  });
});
