import {StyleSheet} from 'react-native';
import color from './colors';

export default StyleSheet.create({
  container: backgroundColor => ({
    flex: 1,
    backgroundColor,
  }),
  row: (width, justifyContent) => ({
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent,
  }),
  centeredContent: backgroundColor => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor,
  }),
  horizontalCentered: {
    flex: 1,
    alignItems: 'center',
  },
});
