import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IconConfig from '../../assets/icon/ColectionIcon.json';
import { TouchableOpacity, StyleProp, TextStyle } from 'react-native';
import AppStyles from '../../theme/appStyles';

interface Props {
  name?: string;
  size: number | undefined;
  style?: StyleProp<TextStyle>;
  color?: string | undefined;
  onPress?: () => void;
  disabled?: boolean;
  testID?: string;
  accessibilityLabel?: string;
}

const Icomoon = createIconSetFromIcoMoon(IconConfig);

const Icon: React.FC<Props> = ({
  name,
  size,
  style,
  color,
  onPress,
  disabled,
  testID,
  accessibilityLabel,
}: Props) => {
  if (name) {
    return (
      <TouchableOpacity
        disabled={disabled || onPress === undefined}
        onPress={onPress}
        testID={testID}
        accessibilityLabel={accessibilityLabel || testID}
        hitSlop={AppStyles.HitSlopValue}
      >
        <Icomoon
          name={name}
          size={size}
          style={{ ...(style as Record<string, unknown>), color }}
        />
      </TouchableOpacity>
    );
  }
  return null;
};

Icon.defaultProps = {
  name: undefined,
  color: undefined,
  style: {},
  disabled: false,
  onPress: undefined,
  testID: 'button-icon',
  accessibilityLabel: undefined,
};

export default Icon;
