import Colors from '../../theme/colors';
import React from 'react';
import { ActivityIndicator } from 'react-native';

interface Props {
  size?: 'large' | 'small' | number;
  color?: string;
  testID?: string;
  accessibilityLabel?: string;
}

const Spinner: React.FC<Props> = ({ size, color, testID, accessibilityLabel }: Props) => (
  <ActivityIndicator
    testID={testID}
    accessibilityLabel={accessibilityLabel || testID}
    size={size}
    color={color}
  />
);

Spinner.defaultProps = {
  size: 'large',
  color: Colors.RED,
  testID: 'loading-indicator',
  accessibilityLabel: undefined,
};

export default Spinner;
