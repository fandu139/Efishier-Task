import AppStyles from '../../theme/appStyles';
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { IMAGE_DEFAULT_EMPTY_LIST } from '../../assets/image';

type Props = {
  image?: string | number;
  title?: string;
  testID?: string;
  accessibilityLabel?: string;
};

const EmptyContent: React.FC<Props> = ({ title, image, testID, accessibilityLabel }: Props) => (
  <View
    style={AppStyles.fillCenterContent}
    testID={testID}
    accessibilityLabel={accessibilityLabel || testID}
  >
    <Image
      source={image as number}
      style={styles.image}
    />
    <Text>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

EmptyContent.defaultProps = {
  image: IMAGE_DEFAULT_EMPTY_LIST,
  title: 'Data tidak ditemukan',
  testID: 'view-empty-content',
  accessibilityLabel: 'view-empty-content',
};

export default EmptyContent;
