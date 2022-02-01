import Checkbox from '../../Checkbox';
import React from 'react';
import { render } from '@testing-library/react-native';

describe('Checkbox component test', () => {
  describe('Checkbox snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(
        <Checkbox testID="check-box-default" checked onChangeValue={() => undefined} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
