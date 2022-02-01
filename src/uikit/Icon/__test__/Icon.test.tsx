import Icon from '../../Icon';
import React from 'react';
import { ICON_SHOW_PASSWORD } from '../../../assets/icon';
import { render } from '@testing-library/react-native';

describe('Icon component test', () => {
  describe('Icon snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(<Icon name={ICON_SHOW_PASSWORD} size={16} color="black" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Icon without Name snapshot test', () => {
    it('should render correctly', () => {
      const tree = render(<Icon size={16} color="black" />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
