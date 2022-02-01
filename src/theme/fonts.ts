type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

const fontFamily = {
  bold: 'SourceSansPro-Bold',
  boldItalic: 'SourceSansPro-BoldItalic',
  regular: 'SourceSansPro-Regular',
  regularItalic: 'SourceSansPro-Italic',
  medium: 'SourceSansPro-SemiBold',
  mediumItalic: 'SourceSansPro-SemiBoldItalic',
  extraBold: 'SourceSansPro-Black',
  extraBoldItalic: 'SourceSansPro-BlackItalic',
};

const size = {
  18: 18,
  16: 16,
  14: 14,
  24: 24,
  30: 30,
  superLarge: 24,
  extraLarge: 20,
  large: 18,
  medium: 16,
  small: 14,
  extraSmall: 12,
  moreExtraSmall: 10,
};

const Fonts = {
  regular: {
    fontFamily: fontFamily.regular,
    fontWeight: 'normal' as FontWeight,
  },
  medium: {
    fontFamily: fontFamily.medium,
    fontWeight: 'normal' as FontWeight,
  },
  bold: {
    fontFamily: fontFamily.bold,
    fontWeight: 'normal' as FontWeight,
  },
  extraBold: {
    fontFamily: fontFamily.extraBold,
    fontWeight: 'normal' as FontWeight,
  },
  fontFamily,
  size,
};

export default Fonts;
