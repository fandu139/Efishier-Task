import AddData from '../index';
import React from 'react';
import { render } from '@testing-library/react-native';

describe('Filter screen test', () => {
  describe('Filter screen snapshot test', () => {
    it('should render correctly', () => {
      const navigation = {
        setOptions: jest.fn(),
        replace: jest.fn(),
      };

      const mockedRoute = {
        params: {
          AddDataScreen: {
            typeAction: 'add',
            item: {
              area_kota: 'Palu',
              area_provinsi: 'Sulawesi Tengah',
              komoditas: 'Ikan Tenggiri',
              price: '10000',
              size: '80',
              tgl_parsed: '2022-02-01',
              timestamp: '11111111',
              uuid: 'abds-asdda-sa1111',
            },
          }
        },
      };

      const tree = render(<AddData navigation={navigation as never} route={mockedRoute as never} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
