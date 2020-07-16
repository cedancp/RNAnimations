import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#FF6493',
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
  },
  topContainer: {
    backgroundColor: '#303371',
    paddingBottom: 40,
  },
  lightBlueTopTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: Dimensions.get('window').width / 2,
    borderBottomWidth: 0,
    borderTopWidth: 150,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#424A93',
    borderBottomColor: 'transparent',
  },
  middleContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  lightBlueLeftTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: Dimensions.get('window').width * 0.45,
    borderRightWidth: 0,
    borderBottomWidth: Dimensions.get('window').width * 0.25,
    borderTopWidth: Dimensions.get('window').width * 0.3,
    borderLeftColor: '#424A93',
    borderRightColor: 'transparent',
    borderTopColor: '#303371',
    borderBottomColor: 'transparent',
  },
  greenRightTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: Dimensions.get('window').width * 0.55,
    borderBottomWidth: Dimensions.get('window').width * 0.35,
    borderTopWidth: Dimensions.get('window').width * 0.3,
    borderLeftColor: '#424A93',
    borderRightColor: '#02ED89',
    borderTopColor: '#303371',
    borderBottomColor: 'transparent',
  },
  bottomDarkTriangle: {
    position: 'absolute',
    bottom: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: Dimensions.get('window').width,
    borderBottomWidth: Dimensions.get('window').height * 0.4,
    borderTopWidth: Dimensions.get('window').width * 0.3,
    borderLeftColor: '#424A93',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: '#15173E',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: -Dimensions.get('window').height * 0.6,
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
    backgroundColor: 'transparent',
  },
  bottomTopRectangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: Dimensions.get('window').width,
    borderBottomWidth: 0,
    borderTopWidth: 150,
    borderLeftColor: 'transparent',
    borderRightColor: 'white',
    borderTopColor: 'transparent',
    borderBottomColor: 'white',
  },
  bottomRectangle: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default styles;
