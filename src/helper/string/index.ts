const thousandSeparator = (value: string | number | undefined): string => {
  if (value && value > 0) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return '0';
};

const StringUtils = {
  thousandSeparator,
};

export default StringUtils;
