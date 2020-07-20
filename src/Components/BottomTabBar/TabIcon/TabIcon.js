import React from 'react';
import {View, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const TabIcon = ({title, image, active}) => {
  return (
    <View style={styles.container}>
      <Image source={image} />
      <Text style={active ? styles.activeTitle : styles.title}>{title}</Text>
    </View>
  );
};

TabIcon.propTypes = {
  image: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default TabIcon;
