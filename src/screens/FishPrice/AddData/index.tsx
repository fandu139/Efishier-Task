import React, { useEffect } from 'react';
import { View, StyleSheet, Button, ToastAndroid } from 'react-native';
import {
  TextField,
} from 'react-native-material-textfield-plus';
import Colors from '../../../theme/colors';
import { goBack } from '../../../helper/navigation';
import SteinStore from 'stein-js-client';
import { StackScreenProps } from '@react-navigation/stack';
import uuid from 'react-native-uuid';
import moment from 'moment';

const storeArea = new SteinStore(
  'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area',
);
const storeSize = new SteinStore(
  'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size',
);

const store = new SteinStore(
  'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list',
);

type RootStackParamList = {
  AddDataScreen: {
    typeAction: string,
    item: {
      area_kota: string,
      area_provinsi: string,
      komoditas: string,
      price: string,
      size: string,
      tgl_parsed: string,
      timestamp: string,
      uuid: string,
    },
  };
};

type Props = StackScreenProps<RootStackParamList, 'AddDataScreen'>;

const AddDataScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const item = route?.params?.item;
  const typeAction = route?.params?.typeAction;
  const [uid, setUid] = React.useState(item?.uuid);
  const [komoditas, setKomoditas] = React.useState(item?.komoditas);
  const [province, setProvince] = React.useState(item?.area_provinsi);
  const [city, setCity] = React.useState(item?.area_kota);
  const [size, setSize] = React.useState(item?.size);
  const [price, setPrice] = React.useState(item?.price);

  useEffect(() => {
    navigation.setOptions({
      title: typeAction === 'add' ? 'Tambah Data' : 'Edit Data',
    });
  });

  const saveData = async (action: string) => {
    if (action === 'add' ) {
      store
        .append('', [
          {
            uuid: uuid.v4(),
            komoditas,
            area_provinsi: province.toUpperCase(),
            area_kota: city.toUpperCase(),
            size,
            price,
            tgl_parsed: moment().format("YYYY-MM-DD"),
            timestamp: moment().unix()
          },
        ])
        .then(() => {
          ToastAndroid.show('Data berhasil di simpan', ToastAndroid.SHORT);
          goBack();
        });
    }

    if (action === 'edit') {
      store
        .edit('', {
          search: { uuid : uid },
          set: {
            komoditas,
            area_provinsi: province.toUpperCase(),
            area_kota: city.toUpperCase(),
            size,
            price,
            tgl_parsed: moment().format("YYYY-MM-DD"),
            timestamp: moment().unix()
          },
        })
        .then(res => {
          ToastAndroid.show('Data berhasil di ubah', ToastAndroid.SHORT);
          goBack();
        });
    }

    if (action === 'delete') {
      store
        .delete('', {
          search: { uuid : uid, komoditas, },
        })
        .then(res => {
          ToastAndroid.show('Data berhasil di hapus', ToastAndroid.SHORT);
          goBack();
        });
    }
  };

  return (
    <View style={styles.svContentContainer}>
      <View style={styles.inputContainer}>
        <TextField
          onChangeText={setKomoditas}
          value={komoditas}
          label="Komoditas"
        />
        <TextField
          onChangeText={setProvince}
          value={province}
          label="Provinsi"
        />
        <TextField
          onChangeText={setCity}
          value={city}
          label="City"
        />
        <TextField
          onChangeText={setSize}
          value={size}
          label="Size"
          keyboardType="numeric"
        />
        <TextField
          onChangeText={setPrice}
          value={price}
          label="Harga"
          keyboardType="numeric"
        />
        <View style={[styles.actionContainer, typeAction === 'edit' && styles.actionTwoContainer]}>
          {typeAction === 'edit' && (
            <Button
            testID="button-clear-filter"
            onPress={() => saveData('delete')}
            title={'Delete Data'}
            color={Colors.RED}
          />)}
          <Button
            testID="button-filter-order"
            onPress={() => saveData(typeAction)}
            title={'Simpan Data'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  svContentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: 15,
  },
  actionContainer: {
    padding: 20,
    borderRadius: 5,
    borderColor: Colors.GRAYEF
  },
  actionTwoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    paddingHorizontal: 20,
  }
});

export default AddDataScreen;
