import { ICON_CHECK } from '../../assets/icon';
import Colors from '../../theme/colors';
import Icon from '../../uikit/Icon';
import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, StyleProp, TextStyle } from 'react-native';
import AppStyles from '../../theme/appStyles';

interface Props {
  disabled?: boolean;
  checked: boolean;
  onChangeValue: () => void;
  testID: string;
  accessibilityLabel?: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
}

const Checkbox: React.FC<Props> = ({
  disabled,
  checked,
  onChangeValue,
  testID,
  accessibilityLabel,
  label,
  labelStyle,
}: Props) => (
  <TouchableOpacity
    testID={testID}
    accessibilityLabel={accessibilityLabel || testID}
    disabled={disabled}
    onPress={onChangeValue}
    style={styles.container}
    hitSlop={AppStyles.HitSlopValue}
  >
    <View style={styles.checkbox}>
      {checked && <Icon name={ICON_CHECK} size={11} color={Colors.RED} />}
    </View>
    {label && <Text style={[styles.labelCheckbox, labelStyle]}>{label}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: Colors.GRAYE0,
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelCheckbox: {
    marginLeft: 10,
    width: '100%',
  },
});

Checkbox.defaultProps = {
  disabled: false,
  accessibilityLabel: undefined,
  label: undefined,
  labelStyle: undefined,
};

export default Checkbox;
