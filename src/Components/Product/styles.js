import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: 248,
  },
  image: {
    height: 80,
    position: 'relative',
    top: 40,
    zIndex: 9999,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 360,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.15,
    shadowRadius: 15,
    paddingTop: 64,
    paddingHorizontal: 41,
    paddingBottom: 43,
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
