import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ICON_ARROW_DIRECTION, ICON_COPY } from '../../../assets/icon';
import AppStyles from '../../../theme/appStyles';
import Colors from '../../../theme/colors';
import Icon from '../../../uikit/Icon';
import String from '../../../helper/string';

type Props = {
  item: {
    komoditas: string;
    area_provinsi: string;
    area_kota: string;
    price: string;
    size: string;
  };
  index: number;
  onPress: () => void;
};

/**
 *
 * @param item
 * @param index
 * @param onPress
 * @returns {*}
 * @constructor
 */

const ItemList: React.FC<Props> = ({
  item,
  onPress,
  index
}: Props) => {
  const fishCommodity = item?.komoditas;
  const province = item?.area_provinsi;
  const kota = item?.area_kota;
  const price = item?.price;
  const size = item?.size;
  const orderConfig = {
    badgeColor: '#FF5733',
    badgeColorAlt: '#CAE6FE',
    shortReadableStatus: 'Default',
  };

  orderConfig.shortReadableStatus = price;

  return (
    <TouchableOpacity onPress={onPress} key={index} style={styles.container} testID="card-item-order">
      <View style={[styles.statusSection, { backgroundColor: orderConfig.badgeColorAlt }]}>
        <Text style={{ color: orderConfig.badgeColor }}>{`Komuditas: ${fishCommodity}`}</Text>
      </View>
      <View style={styles.orderInfoSection}>
        <View style={AppStyles.rowItemsCenterSpace}>
          <View style={AppStyles.rowItemsCenter}>
            <Text style={styles.textColorOrder}>{`Size: ${size}`}</Text>
          </View>
          <Text style={styles.textColorOrder}>{`Rp. ${String.thousandSeparator(orderConfig.shortReadableStatus)}`}</Text>
        </View>
        <View style={styles.orderAddressInfo}>
          <Text>
            {province}, <Text>{kota}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  address: {
    marginBottom: 5,
  },
  icon: {
    marginBottom: 5,
  },
  iconChat: {
    padding: 10,
    paddingRight: 20,
  },
  container: {
    borderColor: Colors.GRAYE0,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  statusSection: {
    ...AppStyles.rowItemsCenterSpace,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  orderInfoSection: { paddingHorizontal: 15, marginVertical: 10 },
  buttonSection: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.GRAYE0,
  },
  chatButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.GRAYE0,
  },
  detailButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  orderAddressInfo: {
    marginTop: 10,
    marginBottom: 17,
  },
  textColorOrder: {
    color: Colors.BLACK_50,
  },
  iconCopy: {
    marginLeft: 5,
  },
});

export default ItemList;
