import {StyleSheet} from 'react-native';
import {screenHeight} from '../../config/constants';

const styles = StyleSheet.create({
  container: {
    marginTop: screenHeight * 0.01,
  },
  cardsContainer: {
    paddingBottom: screenHeight * 0.075,
  },
  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    marginHorizontal: 9,
  },
});

export default styles;
