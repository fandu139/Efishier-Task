import React from 'react';
import { View, StyleSheet, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import Colors from '../../../theme/colors';
import Fonts from '../../../theme/fonts';
import AppStyles from '../../../theme/appStyles';
import Checkbox from '../../../uikit/Checkbox';
import Icon from '../../../uikit/Icon';
import { goBack } from '../../../helper/navigation';
import { ICON_ARROW_DOWN, ICON_ARROW_UP } from '../../../assets/icon';
import SteinStore from 'stein-js-client';
import { useEffect } from 'react';
import { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';

type RouteParams = {
  handleFilter: (type: string, text: string) => void;
};

type RootStackParamList = {
  ListFilterScreen: RouteParams;
};

type Props = StackScreenProps<RootStackParamList, 'ListFilterScreen'>;

const storeArea = new SteinStore(
  'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area',
);
const storeSize = new SteinStore(
  'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size',
);

const ListFilterScreen: React.FC<Props> = ({ route }: Props) => {
  const { handleFilter } = route.params;
  const [categoryFilterSelected, setCategoryFilterSelected] = useState(0)
  const [dataSelected, setDataSelected] = useState({
    idCategoryFilterSelected: null,
    dataSelect: null
  });
  const listDataFilter = [{
    id: 0,
    label: 'Filter berdasarkan provinsi dan kota',
  }, {
    id: 1,
    label: 'Filter berdasarkan size',
  }];
  const [filterByArea, setFilterByArea] = React.useState([]);
  const [filterBySize, setFilterBySize] = React.useState([]);

  useEffect(() => {
    const getData = async () => {
      storeArea.read('').then(data => {
        setFilterByArea(data)
      });

      storeSize.read('').then(data => {
        setFilterBySize(data)
      });
    };

    getData();
  }, []);

  const clearFilter = () => {
    setDataSelected({
      idCategoryFilterSelected: null,
      dataSelect: null
    })
  }

  const handleFilterData = () => {
    const type = categoryFilterSelected ? 'size' : 'city'
    const data = categoryFilterSelected ? filterBySize : filterByArea;
    handleFilter(type, data[dataSelected?.dataSelect]);
    goBack();
  }

  const RenderSelectedItem = ({ item }) => {
    const data = item?.id ? filterBySize : filterByArea;

    return (
      <View style={styles.topContent}>
        {data.map((itemList, indexList) => {
          const testID = item?.id ? itemList?.size : `${itemList?.province} - ${itemList?.city}`;
          const label = item?.id ? `Size - ${itemList?.size}` : `${itemList?.province} - ${itemList?.city}`;

          return (
            <View key={indexList} style={styles.bottomContentContainer}>
              <View style={styles.buttonContainerWithBorder}>
                <Checkbox
                  testID={testID}
                  onChangeValue={() => {
                    setDataSelected({
                      idCategoryFilterSelected: item?.id,
                      dataSelect: indexList
                    });
                  }}
                  checked={dataSelected?.dataSelect === indexList &&  dataSelected?.idCategoryFilterSelected === item?.id }
                  label={label}
                />
              </View>
            </View>
          )
        })}
      </View>
    )
  }

  return (
    <View style={styles.svContentContainer}>
      <FlatList
        onEndReachedThreshold={0.1}
        style={styles.container}
        data={listDataFilter}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          const icon = categoryFilterSelected === item.id ? ICON_ARROW_UP : ICON_ARROW_DOWN
          return (
            <View style={styles.listItemContainer}>
              <TouchableOpacity
                key={item.id} 
                onPress={() => {
                  if (index === categoryFilterSelected) {
                    setCategoryFilterSelected(null);
                  } else {
                    setCategoryFilterSelected(index);
                  }
                }}
                style={styles.listCategoryContainer}
              >
                <Text style={styles.titleLabelCheckbox}>{item.label}</Text>
                <Icon
                  testID="icon-check-available"
                  accessibilityLabel="icon-check-available"
                  name={icon}
                  size={10}
                  color={Colors.RED}
                />
              </TouchableOpacity>
              {item?.id === categoryFilterSelected && <RenderSelectedItem item={item} />}
            </View>
          );
        }}
      />
      <View style={styles.actionContainer}>
        <View style={styles.filterContainer}>
          <Button
            testID="button-filter-order"
            onPress={handleFilterData}
            title={'Filter'}
          />
        </View>
        <View>
          <Button
            testID="button-clear-filter"
            onPress={clearFilter}
            title={'Reset'}
            color={Colors.RED}
          /> 
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  buttonContainer: {
    marginVertical: 15,
  },
  svContentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
  },
  bottomContentContainer: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAYE0,
  },
  labelCheckbox: {
    marginLeft: 10,
  },
  topContent: {
    paddingHorizontal: 20,
  },
  buttonContainerWithBorder: {
    ...AppStyles.rowItemsCenter,
    paddingBottom: 20,
  },
  titleLabelCheckbox: {
    fontSize: Fonts.size.extraSmall,
    color: Colors.GRAY60,
    paddingVertical: 20,
    flexGrow: 1,
  },
  listItemContainer: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAYF3,
  },
  listCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionContainer: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 5,
    borderTopWidth: 1,
    borderColor: Colors.GRAYEF,
  },
  filterContainer: {
    paddingBottom: 20,
  }
});

export default ListFilterScreen;
