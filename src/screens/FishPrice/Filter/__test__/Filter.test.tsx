import Filter from '../index';
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
          handleFilter: () => null
        },
      };

      const tree = render(<Filter navigation={navigation as never} route={mockedRoute as never} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
