import {render} from 'react-native-testing-library';
import React from 'react';
import Profile from '../Profile';
import {Animated} from 'react-native';

describe('Profile component', () => {
  const props = {
    image: 1234,
    name: 'Test Name',
    notification: 'test notification',
  };

  const wrapper = () => {
    return render(<Profile {...props} />);
  };

  it('should render correctly Profile', () => {
    wrapper();
  });

  it('should render Profile container', () => {
    const {getByTestId} = wrapper();
    getByTestId('profile');
  });

  it('should render profile image', () => {
    const {getByTestId} = wrapper();
    getByTestId('profile-image');
  });

  it('should set the image from props', () => {
    const {getByTestId} = wrapper();
    const imageContainer = getByTestId('profile-image');

    expect(imageContainer.props.source).toBe(props.image);
  });

  it('should show profile name', () => {
    const {getByTestId} = wrapper();
    const nameContainer = getByTestId('profile-name');

    expect(nameContainer.props.children).toBe(props.name);
  });

  it('should show product notification', () => {
    const {getByTestId} = wrapper();
    getByTestId('profile-notification');
  });

  it('should start animations', () => {
    const animatedSpy = jest.spyOn(Animated, 'parallel');
    wrapper();
    expect(animatedSpy).toHaveBeenCalledTimes(1);
  });

  it('should show notification message', () => {
    const {getByTestId} = wrapper();
    const notificationText = getByTestId('notification');

    expect(notificationText.props.children).toBe(props.notification);
  });
});
