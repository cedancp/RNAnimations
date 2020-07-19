import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const Product = ({image, title, description}) => {
  return (
    <View testID="container-product" style={styles.container}>
      <Image
        testID="image-product"
        style={styles.image}
        resizeMode="contain"
        source={image}
      />
      <View testID="card-product" style={styles.card}>
        <View>
          <Text testID="title-product" style={styles.title}>
            {title}
          </Text>
          <Text testID="description-product" style={styles.description}>
            {description}
          </Text>
        </View>
        <TouchableOpacity testID="view-product" style={styles.view}>
          <Text style={styles.viewText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

Product.propTypes = {
  image: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Product;
