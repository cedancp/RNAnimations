import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render, waitFor} from 'react-native-testing-library';

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

  it('should set product animation delay', async (done) => {
    const {getByTestId} = render(<App />);
    let firstProduct;
    await waitFor(() => {
      firstProduct = getByTestId('item-0');
    });
    expect(firstProduct.props.children.props.delay).toBe(300);
    done();
  });

  it('should set product animation delay to 0 after first render', async (done) => {
    const {getByTestId, update} = render(<App />);
    update(<App />);
    let firstProduct;
    await waitFor(() => {
      firstProduct = getByTestId('item-0');
    });
    expect(firstProduct.props.children.props.delay).toBe(0);
    done();
  });
});
