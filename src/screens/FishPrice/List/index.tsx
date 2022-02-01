import React, { useCallback } from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Text
} from 'react-native';
import SteinStore from 'stein-js-client';
import { debounce, orderBy } from 'lodash';
import Modal from "react-native-modal";
import AppStyles from '../../../theme/appStyles';
import Colors from '../../../theme/colors';
import Fonts from '../../../theme/fonts';
import { ICON_SEARCH, ICON_SORT } from '../../../assets/icon';
import Icon from '../../../uikit/Icon';
import Spinner from '../../../uikit/Spinner';
import EmptyContent from '../../../uikit/EmptyContent';
import Checkbox from '../../../uikit/Checkbox';
import { navigate } from '../../../helper/navigation';
import ItemList from '../components/ItemList';
import { useFocusEffect } from '@react-navigation/native';

const store = new SteinStore(
  'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list',
);

const ListFishPriceScreen: React.FC = () => {
  const [isFocus, setIsFocus] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isShowSpinner, setIsShowSpinner] = React.useState(true);
  const [searchBy, setSearchBy] = React.useState({
    showModal: false,
    selectedId: 2,
    optionSearch: [
      {
        id: 0,
        label: 'Cari berdasarkan uuid',
        keySearch: 'uuid',
      },
      {
        id: 1,
        label: 'Cari berdasarkan komoditas',
        keySearch: 'komoditas',
      },
      {
        id: 2,
        label: 'Cari berdasarkan provinsi',
        keySearch: 'province',
      },
      {
        id: 3,
        label: 'Cari berdasarkan city',
        keySearch: 'city',
      },
      {
        id: 4,
        label: 'Cari berdasarkan size',
        keySearch: 'size',
      },
      {
        id: 5,
        label: 'Cari berdasarkan price',
        keySearch: 'price',
      },
    ],
  });
  const [searchByFilter, setSearchByFilter] = React.useState('');
  const [dataListPrice, setDataListPrice] = React.useState([]);

  const getData = async (type, searchBy) => {
    if (type === 'all') {
      store.read('').then(data => {
        const result = data.filter(value => value.komoditas && value.timestamp !== null );
        setDataListPrice(result);
        setIsShowSpinner(false);
      });
    } else if (type === 'searchBy') {
      store.read('', { search: searchBy }).then(data => {
        const result = data.filter(value => value.komoditas && value.timestamp !== null);
        setDataListPrice(result);
        setIsShowSpinner(false);
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      isFocus && getData('all', '');
      return () => {};
    }, [isFocus]),
  );

  const sortDataListPrice = orderBy(dataListPrice,
    ['tgl_parsed'],
    ['desc']
  );

  const getDataByFilter = async (textValue: string, idValue: number) => {
    const text = textValue.toUpperCase();
    const data = searchBy.optionSearch.filter(value => value.id === idValue);
    const getCategoryData = data[0]?.keySearch;
    
    let searchData: {
      uuid?: string;
      komoditas?: string;
      area_provinsi?: string;
      area_kota?: string;
      size?: string;
      price?: string;
    } = {
      area_provinsi: text,
    };

    if (getCategoryData === 'uuid') {
      searchData = {
        uuid: text,
      }
    } else if (getCategoryData === 'komoditas') {
      searchData = {
        komoditas: text,
      }
    } else if (getCategoryData === 'province') {
      searchData = {
        area_provinsi: text,
      }
    } else if (getCategoryData === 'city') {
      searchData = {
        area_kota: text,
      }
    } else if (getCategoryData === 'size') {
      searchData = {
        size: text,
      }
    } else if (getCategoryData === 'price') {
      searchData = {
        price: text,
      }
    }

    setIsShowSpinner(true);

    if (text === '') {
      getData('all', '');
    } else {
      getData('searchBy', searchData)
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    getData('all', '');
    setIsRefreshing(false);
  };

  const goToFilterScreen = async () => {
    await setIsFocus(false);
    navigate('FishPriceFilterScreen', {
      handleFilter: (type: string, text: string) => {
        let data: {
          area_kota?: string;
          size?: string;
        } = {
          area_kota: text?.city,
        }
        if (type === 'size') {
          data = {
            size: text,
          }
        }

        store.read('', { search: data }).then(data => {
          setDataListPrice(data)
        });
      }
    })
  };

  const handleModal = () => {
    setSearchBy({
      ...searchBy,
      showModal: !searchBy.showModal
    })
  };

  const handleSelectSearchBy = (item) => {
    setSearchBy({
      ...searchBy,
      showModal: false,
      selectedId: item?.id,
    });
  };

  const debouncedGetData = useCallback(debounce(getDataByFilter, 300), []);

  const handleSearch = (text: string) => {
    setSearchByFilter(text)
    debouncedGetData(text, searchBy?.selectedId)
  }

  const checkFilter = () => {
    const data = searchBy.optionSearch.filter(value => value.id === searchBy.selectedId);
    return data[0]?.label
  }

  const SearchByModalComponent = () => {
    return (
      <View>
        <Modal
          isVisible={searchBy.showModal}
          backdropColor={Colors.BLACK}
          style={styles.modalContent}
          onSwipeComplete={handleModal}
          swipeDirection={['down']}
          onBackButtonPress={handleModal}
          onBackdropPress={handleModal}
        >
          <Text style={styles.searchText}>Cari bersarkan</Text>
          <View style={{ flex: 1 }}>
            {
              searchBy?.optionSearch?.map((item, index) => (
                <View key={index} style={styles.flatListText}>
                  <Checkbox
                    testID={item.label}
                    onChangeValue={() => handleSelectSearchBy(item)}
                    checked={searchBy?.selectedId === item?.id}
                    label={item.label}
                  />
                </View>
              ))
            }
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={AppStyles.container}>
      <View style={styles.containerSearch}>
        <View style={styles.containerInputSearch}>
          <View style={styles.containerIconSearch}>
            <TouchableOpacity testID="button-filter-screen-active" onPress={handleModal}>
              <Icon name={ICON_SEARCH} size={16} color={Colors.GRAY80} />
            </TouchableOpacity>
          </View>
          <TextInput
            value={searchByFilter}
            onChangeText={(text) => handleSearch(text)}
            style={styles.textInput}
            placeholder={checkFilter()}
            testID="text-input-search-by-order-id-active"
          />
        </View>
        <TouchableOpacity testID="button-filter-screen-active" onPress={goToFilterScreen}>
          <View>
            {/* <IconCheckFilter filter={filter} isLoading={isLoading} /> */}
            <Icon style={styles.iconSort} name={ICON_SORT} size={16} color={Colors.GRAY80} />
          </View>
        </TouchableOpacity>
      </View>

      {isShowSpinner ? 
        <View style={{ flex: 1,justifyContent: 'space-around' }}><Spinner /></View> :
        <FlatList
          testID="flat-list-item-order-active"
          onEndReachedThreshold={0.1}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
          contentContainerStyle={AppStyles.flatListContainer}
          data={sortDataListPrice}
          ListEmptyComponent={() => {
            return <EmptyContent />;
          }}
          renderItem={({ item, index }) => (
            <ItemList
              item={item}
              index={index}
              onPress={() => {
                setIsFocus(true);
                navigate('AddDataScreen', {
                  typeAction: 'edit',
                  item,
                })}
              }
            />
          )}
        />
      }
      <View style={styles.actionContainer}>
        <Button
          testID="button-filter-order"
          onPress={() => {
            setIsFocus(true);
            navigate('AddDataScreen', {
              typeAction: 'add'
            })}
          }
          title={'Tambah Data'}
        />
      </View>
      <SearchByModalComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  marketplaceButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  containerSearch: {
    height: 65,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 10,
  },
  iconSort: {
    marginTop: 10,
    padding: 12,
  },
  containerInputSearch: {
    ...Fonts.regular,
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: Colors.GRAYF3,
    flex: 1,
  },
  spinnerContainer: {
    marginVertical: 20,
  },
  textInput: {
    flex: 1,
    ...Fonts.regular,
  },
  containerIconSearch: {
    width: 40,
    ...AppStyles.centerContent,
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    padding: 15,
  },
  flatListText: {
    padding: 15,
  },
  actionContainer: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 5,
    borderTopWidth: 1,
    borderColor: Colors.GRAYEF,
  },
  searchText: {
    fontWeight: 'bold' ,
    paddingVertical: 20, 
  }
});

export default ListFishPriceScreen;
