import EmptyContent from '../../EmptyContent';
import React from 'react';
import { render } from '@testing-library/react-native';

describe('empty content component test', () => {
  describe('snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(<EmptyContent />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
