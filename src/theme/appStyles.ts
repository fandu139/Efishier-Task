import Colors from './colors';
import { Dimensions, StyleSheet } from 'react-native';

const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  containerGray: {
    flex: 1,
    backgroundColor: Colors.GRAYF3,
  },
  rowItems: {
    flexDirection: 'row',
  },
  rowItemsCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowItemsAllCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowItemsSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItemsCenterSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fillCenterContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLeftIcon: {
    marginRight: 20,
    paddingVertical: 10,
  },
  flatListContainer: {
    minHeight: '100%', // to make sure empty component is centered
    marginHorizontal: 20,
    paddingBottom: 20,
  },
  scrollViewContainer: {
    minHeight: '100%', // to make sure empty component is centered
    paddingBottom: 20,
  },
  DeviceWidth: {},
  DeviceHeight: {},
  HitSlopValue: {},
});

AppStyles.DeviceWidth = Dimensions.get('window').width;
AppStyles.DeviceHeight = Dimensions.get('window').height;
AppStyles.HitSlopValue = {
  top: 15,
  bottom: 15,
  left: 15,
  right: 15,
};

export default AppStyles;
