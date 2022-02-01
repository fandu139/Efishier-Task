import Spinner from '../../Spinner';
import React from 'react';
import { render } from '@testing-library/react-native';

describe('Spinner component test', () => {
  describe('snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(<Spinner />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
