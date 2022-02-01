import List from '../index';
import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
}));

jest.mock('react-native-modal');

describe('List screen test', () => {
  describe('List screen snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(<List />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
