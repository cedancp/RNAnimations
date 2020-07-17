import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: 'white',
    marginTop: 6,
  },
  notificationContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 30,
    marginTop: 16,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 16,
  },
  notification: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: 'black',
  },
});

export default styles;
