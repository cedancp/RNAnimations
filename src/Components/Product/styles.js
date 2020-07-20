import {StyleSheet, Platform} from 'react-native';
import {productCardWidth, screenHeight} from '../../config/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: productCardWidth,
  },
  containerPaddingButton: {
    paddingTop: 80,
  },
  image: {
    height: 80,
    position: 'relative',
    top: 40,
    zIndex: 9999,
    alignSelf: 'center',
    ...Platform.select({
      android: {
        elevation: 6,
      },
    }),
  },
  button: {
    height: 80,
    alignSelf: 'center',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    height: screenHeight * 0.43,
    ...Platform.select({
      ios: {
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.2,
        shadowRadius: 15,
      },
      android: {
        elevation: 5,
      },
    }),
    paddingTop: screenHeight * 0.07,
    paddingHorizontal: screenHeight * 0.03,
    paddingBottom: screenHeight * 0.05,
  },
  cardButtonPaddingTop: {
    paddingTop: screenHeight * 0.03,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
    color: '#4E5B76',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#A0A9B8',
    textAlign: 'center',
    marginTop: 20,
  },
  view: {
    backgroundColor: '#303371',
    paddingHorizontal: 35,
    paddingVertical: 9,
    borderRadius: 19,
  },
  viewText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    color: 'white',
  },
});

export default styles;
