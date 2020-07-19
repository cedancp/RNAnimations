import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Dot = ({style, active, activeColor, color}) => {
  const activeStyle = {backgroundColor: active ? activeColor : color};
  return <View testID="dot" style={[style, styles.dot, activeStyle]} />;
};

Dot.propTypes = {
  style: PropTypes.object,
  active: PropTypes.bool.isRequired,
  activeColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Dot;
