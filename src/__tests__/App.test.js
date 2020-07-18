import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render} from 'react-native-testing-library';

describe('App', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
  });

  it('should render Background', () => {
    const {getByTestId} = render(<App />);

    getByTestId('background');
  });

  it('should render Profile', () => {
    const {getByTestId} = render(<App />);

    getByTestId('profile');
  });
});
